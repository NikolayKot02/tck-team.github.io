import discord
from discord.ext import commands
import requests
import base64
import os

# Эти данные бот возьмет из настроек хостинга, а не из кода
TOKEN = os.getenv('MTQ5NjIyMjE4MzU4MjYwMTM0OA.GTuhzp.MY25eRTUXlE-7w1QhI5uzMRMgYQbt70wdBF6M0')
GITHUB_TOKEN = os.getenv('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')
REPO_NAME = "nikolaykot02/tck-team" # ЗАМЕНИ НА СВОЁ (например: ivan/my-site)
FILE_PATH = "logs.txt"
CHANNEL_ID = 1496225381928145166# ЗАМЕНИ НА ID СВОЕГО КАНАЛА

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

def update_github(content):
    url = f"https://github.com{REPO_NAME}/contents/{FILE_PATH}"
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    r = requests.get(url, headers=headers)
    sha = r.json().get('sha') if r.status_code == 200 else None
    old_text = base64.b64decode(r.json()['content']).decode() if sha else ""
    
    new_text = old_text + "\n" + content
    encoded = base64.b64encode(new_text.encode()).decode()
    
    data = {"message": "Update logs", "content": encoded, "sha": sha}
    res = requests.put(url, headers=headers, json=data)
    return res.status_code

@bot.event
async def on_message(msg):
    if msg.author == bot.user or msg.channel.id != CHANNEL_ID: return
    if update_github(f"{msg.author}: {msg.content}") in [200, 201]:
        await msg.add_reaction('✅')

bot.run(TOKEN)

