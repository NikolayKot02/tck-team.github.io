import discord
from discord.ext import commands
import requests
import base64
import os
from keep_alive import keep_alive  # Импортируем наш мини-сервер

# Настройки (Берутся из переменных окружения на Render)
TOKEN = os.getenv('DISCORD_TOKEN')
GITHUB_TOKEN = os.getenv('GH_TOKEN')

# ТВОИ НАСТРОЙКИ
REPO_NAME = "NikolayKot02/tck-team" 
FILE_PATH = "logs.txt"
CHANNEL_ID = 1496225381928145166  # Твой ID канала

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

def update_github(content):
    # ПРАВИЛЬНЫЙ URL ДЛЯ API
    url = f"https://github.com{REPO_NAME}/contents/{FILE_PATH}"
    "
    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github.v3+json"
    }
    
    # 1. Пытаемся получить текущий файл, чтобы узнать его SHA и старый текст
    r = requests.get(url, headers=headers)
    sha = None
    old_text = ""
    
    if r.status_code == 200:
        data = r.json()
        sha = data.get('sha')
        old_text = base64.b64decode(data['content']).decode('utf-8')
    elif r.status_code != 404:
        # Если ошибка не "Файл не найден", возвращаем код ошибки (например, 401 если плохой токен)
        return r.status_code
    
    # 2. Добавляем новую строку в конец
    new_text = old_text + "\n" + content
    encoded = base64.b64encode(new_text.encode('utf-8')).decode('utf-8')
    
    # 3. Подготовка данных для отправки
    payload = {
        "message": "Добавлена запись из Discord",
        "content": encoded
    }
    if sha:
        payload["sha"] = sha # Если файл существует, нужно передать его SHA
    
    # 4. Отправляем обновленный файл на GitHub
    res = requests.put(url, headers=headers, json=payload)
    return res.status_code

@bot.event
async def on_ready():
    print(f'Бот {bot.user} успешно запущен!')

@bot.event
async def on_message(msg):
    # Игнорируем сообщения от самого бота и из других каналов
    if msg.author == bot.user:
        return
    if msg.channel.id != CHANNEL_ID:
        return

    # Пытаемся записать в GitHub
    status = update_github(f"{msg.author}: {msg.content}")
    
    # Коды 200 (OK) или 201 (Created) означают успех
    if status in [200, 201]:
        await msg.add_reaction('✅')
    else:
        await msg.channel.send(f"❌ Ошибка GitHub: {status}. Проверь токен и права доступа.")

# Сначала запускаем веб-сервер "заглушку", потом бота
keep_alive()
bot.run(TOKEN)
