---
author: ["xineohperif"]
title: "Soccer Discord Bot to make your Covid days much better"
date: "2023-08-26"
description: "Discord bot with your favorite games: Missing 11, Guess the player, Tic-tac-toe,..."
summary: "Discord bot with your favorite games: Missing 11, Guess the player, Tic-tac-toe,..."
tags: ["discord-bot", "coding", "random"]
categories: ["coding"]
series: ["Random Projects"]
section: posts
ShowToc: true
---

## Introduction

During the tough days of Covid, stuck with online studies and feeling down, Discord and my friends ✨ were a lifeline. Chatting and playing games on Discord made things a lot more fun.

I stumbled upon Discord bots, especially the Game Discord Bots, and thought it'd be cool to play soccer games. But, there weren't any. After some Google searching, I discovered I could make my own Discord Bot using Python.

With just one year of Python experience, I learned to code and set it up on repl.it. I kept adding our favorite games like "Guess the player," "Missing 11," and "Soccer Quiz."

This project is my favorite. It brought me joy and helped my friends and me get through one of the toughest times for everyone.

## Process

Let's walk through the process of creating the bot:

### 1. Register the bot

Start by visiting the [Discord Developer Portal](https://discord.com/developers/applications), selecting "New Application," and filling in the necessary information for your Discord bot. Create a new Bot Token, a crucial element for bot development.

![1705682228710](/soccer-discord-bot-in-covid-days/1705682228710.png)

**Note:** If you've already created the token, opt for "Reset Token" to generate a new one.

### 2. Invite the bot to your server

Now, invite the bot to your server for testing. Navigate to `OAuth2 -> URL Generator`, choose the options `bot` and `Administrator` for your local server, and generate a URL like `https://discord.com/api/oauth2/authorize?client_id={client_id}&permissions=2048&scope=bot.` Paste this URL into your browser's search bar to add the bot to your server.

![1705683032435](/soccer-discord-bot-in-covid-days/1705683032435.png)

Once you see the bot's incoming message in your server, it confirms successful addition.

### 3. Start coding ✨

Now, to start, I would recommend trying to run your code on [repl.it](https://replit.com). Create an account if you haven't already, and create a new project.

Create 2 files `main.py` and `keep_alive.py`. These are the only 2 files you need right now.

For `keep_alive.py`, paste the following code in:

```python
from flask import Flask
from threading import Thread

app = Flask('')

@app.route('/')
def home():
    return "Hello. I am alive!"

def run():
  app.run(host='0.0.0.0',port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()
```

And for `main.py`, paste in the following template that I created:

```python
from discord.ext import commands
import os

client = commands.Bot(command_prefix='$')

@client.event
async def on_ready():
    print("Bot's ready")

@client.event
async def on_message(message):
    if message.author == client.user:
        return
    msg = message.content

    if msg == "Hello Discord Bot":
        await message.channel.send('Hi ' + message.author.display_name)

    await client.process_commands(message)

keep_alive()

client.run(os.environ["TOKEN"])
```

Now, please open the `Secrets` tab in your Repl and add a new secret. The key will be `TOKEN`, and the value will be the Bot token you copied from the previous step.

With that are set, you can start running your bot! Press `Run` and wait for a bit. After you see the message "Bot's ready" in terminal, you can start testing your bot.

In your server, try typing "Hello Discord Bot", it will respond like this:

![1705684870442](/soccer-discord-bot-in-covid-days/1705684870442.png)

### 4. Add your own touch

With all of that setup, you can now create anything you want! Just think of something you can do with the Discord Bot and make it yourself.

For reference, I will talk about the process of adding the Soccer Games. So in order to create the soccer games like starting 11 or guess the player, I need to get data from previous matches, or player's history.

But to do that, I need to find some kinds of API, or I have to crawl data from a soccer site. After looking around, I cannot find a free API that has things I need. So I decided to crawl data from [Transfermarkt](https://www.transfermarkt.com). This site has everything I need, from player's transfer history, to the line-ups of all the matches in history.

So firstly, I used `bs4` to crawl data. But a downside of `bs4` is that it only works on static web. And because transfrmarkt is a dynamic generated website, this library didn't work. Luckily, I found another alternative, which is `requests-html`. This works simillar to `bs4`, but it will wait for the website to load before crawling the data.

Below is a code demo of the functions for my games, which contains all the data crawling and game creating.

```python

from requests_html import HTMLSession
import random
import nextcord

# get_matches_from_team_and_year
def get_matches(team_id, year):
    url = f"https://www.transfermarkt.com/manchester-united/"
    url += f"spielplandatum/verein/{team_id}"
    url += f"/plus/0?saison_id={year}&wettbewerb_id=&"
    url += "day=&heim_gast=&punkte=&datum_von=-&datum_bis=-"
    session = HTMLSession()
    r = session.get(url)
    print(url)  
    matches = r.html.find('.ergebnis-link')
    matches_ids = [
        int(match.attrs["href"].split("/")[-1]) for match in matches
    ]
    return matches_ids

# more code here...
```

Here's the [code's repo](https://github.com/Theskrtnerd/soccer-discord-bot) if you want to have a deeper look.
Hopefully, from this you can get some inspirations to create your own unique Discord bot.

## Conclusion

In conclusion, a Discord bot proves to be an excellent and practical way to enhance coding skills while creating something interesting for beginners.

I hope you find inspiration in this journey and that it proves useful for your own Discord bot endeavors.
