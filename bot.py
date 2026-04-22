import discord
from discord.ext import commands
import requests
import base64
import os
from keep_alive import keep_alive  # Импортируем наш мини-сервер

# Настройки (Берем из переменных окружения Render)
TOKEN = os.getenv('DISCORD_TOKEN')
GITHUB_TOKEN = os.getenv('GH_TOKEN')

# ТВОИ НАСТРОЙКИ
REPO_NAME = "https://github.com/NikolayKot02/tck-team/blob/main/logs.txt" 
FILE_PATH = "logs.txt"
CHANNEL_ID = 1496225381928145166  # ЗАМЕНИ НА ID СВОЕГО КАНАЛА

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

def update_github(content):
    url = f"https://github.com{REPO_NAME}/contents/{FILE_PATH}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    
    # Пытаемся получить файл
    r = requests.get(url, headers=headers)
    sha = None
    old_text = ""
    
    if r.status_code == 200:
        sha = r.json().get('sha')
        old_text = base64.b64decode(r.json()['content']).decode('utf-8')
    
    # Добавляем новую строку
    new_text = old_text + "\n" + content
    encoded = base64.b64encode(new_text.encode('utf-8')).decode('utf-8')
    
    data = {
        "message": "Добавлена запись из Discord",
        "content": encoded,
        "sha": sha
    }
    
    res = requests.put(url, headers=headers, json=data)
    return res.status_code

@bot.event
async def on_ready():
    print(f'Бот {bot.user} успешно запущен!')

@bot.event
async def on_message(msg):
    # Игнорим сообщения от самого бота и из других каналов
    if msg.author == bot.user:
        return
    if msg.channel.id != CHANNEL_ID:
        return

    # Отправляем в GitHub
    status = update_github(f"{msg.author}: {msg.content}")
    
    if status in [200, 201]:
        await msg.add_reaction('✅')
    else:
        await msg.channel.send(f"❌ Ошибка GitHub: {status}")

# Сначала запускаем веб-сервер, потом бота
keep_alive()
bot.run(TOKEN)
