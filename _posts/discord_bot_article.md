---
title: "初心 Discord Bot 開発覚書"
excerpt: "Python と Discord.py を用いた Discord Bot の開発チュートリアルになります。"
coverImage: "/assets/blog/discord_bot/pdf2_p1_discord_logo.png"
date: "2026-04-10"
author:
  name: Tim Neutkens
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/discord_bot/pdf2_p1_discord_logo.png"
---
## 目次

1. [前書き](#前書き)
2. [目的と目標](#目的と目標)
3. [実際に作ってみよう](#実際に作ってみよう)
4. [引用・参考文献](#引用参考文献)

---

## 前書き
※本記事はコミックマーケットで頒布した部誌の焼き直しになります。※

本報告書は、主に Python と Discord.py を用いた Discord Bot の開発チュートリアルになります。

また、当方は工学部の面汚しな程**浅学・無知蒙昧・不学・不見識**な故、「テック系スタバ Mac カタカタッターン！」のような方にとっては薄味な内容になることご了承ください。代わりに、全く知識のない方でも興味を持っていただけるよう細かいところの解説や、私なりの解釈などを交えて書いてゆきますので、気楽に読んでくださると幸いです。

---

## 目的と目標

時は遡ること 3 か月ほど前、Youtube を見ていたら「Discord でなんでも教えてくれるツンデレ幼馴染を作る」という動画が偶然目に留まった。見て開口一番、「**おいこれオタクの夢じゃん！！！**」と思いまして。作ってみようと思った次第です。

@[card](https://www.youtube.com/watch?v=ld1wr1SvaT8)


とりあえず動くものを完成させることを第一目標に設定。しかし、如何せん何の知識もないため、サブ目標兼目的として **目的から逆算して必要な知識を都度手に入れる方法を習得する** ことにしました。

---

## 実際に作ってみよう

コード全文は [GitHub](https://github.com/Tatsubooom/GPTchan) 上に挙げてあります。本記事では要所要所ピックアップして紹介していきます。

### Step 1. Discord Bot の骨組み作成

```python
import os
import discord
from discord.ext import commands
from dotenv import load_dotenv

load_dotenv()
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
client = commands.Bot(command_prefix='!', intents=intents)

client.run(DISCORD_TOKEN)
```

一番上の塊は各種ライブラリのインポートと、env ファイルに逃がしたトークンキーの読み取り。

:::message alert
GitHub などでコードを公開するときは**必ず見えないところにトークンを置く**必要があることに注意しよう。
:::

真ん中の塊は Bot の**インテント設定**。これは簡単に言えば Bot のアクセス権限みたいなもので、Discord サーバー上にあるあらゆる情報のどれにアクセスできるようにするのかを決められる。これをキチンと設定しないと Bot が発言することはおろか、呼びかけがあったことすら認識できないため適切に設定しよう。Discord Developer Portal からも同様の設定が必要。

最後に `client.run` で Bot の起動を行う。

:::message alert
`client.run` が無いとエラーは吐かないのに動かないという一番最悪なエンドを迎えるので気を付けよう（二敗）。
:::

---

### Step 2. GPT API 連携

ライブラリごとにソースファイルを分けると管理しやすい：

```
GPTTESTBOT/
├ discord_bot.py
├ gpt_api.py
└ （その他）
```

```python:gpt_api.py
from openai import OpenAI
from dotenv import load_dotenv
import os

def createTextResponse(input_massage):
    load_dotenv()
    api_key = os.getenv("OPENAI_API_KEY")
    GPTclient = OpenAI()
    response = GPTclient.responses.create(
        model="gpt-4.1",
        instructions="日本語,口語調,100文字以内,ツンデレ",
        input=input_massage,
    )
    if response.error != None:
        return response.error
    return response.output_text
```

:::details 各パラメータの説明
- `model` : 使用する ChatGPT のバージョン
- `instructions` : キャラクターや文体などの性格設定を書き込む箇所
- `input` : GPT に渡す会話文
- そのほか、生成文のランダム度や最大トークン数なども設定可能
:::

`discord_bot.py` 側から `createTextResponse` を呼び出して使っていく。

---

### Step 3. 会話関数の作成

```python:discord_bot.py
async def conversation(text):
    if text.content == None or len(text.content) <= 1:
        await text.channel.send("呼んだ？")
        return
    output_text = gpt_api.createTextResponse(text.content)
    await text.channel.send(output_text)
```

イベントを通して受け取ったテキスト文を確認して、あまりに短い文だったら簡単な返事を返す。そうでなければ、GPT API にテキスト文を流して応答文を受け取り、テキストチャンネルに返す。

---

### Step 4. コマンドで Bot を呼び出す

```python:discord_bot.py
@client.command()
async def talk(ctx):
    ctx.message.content = ctx.message.content.replace('!talk', '')
    await conversation(ctx.message)
```

コマンドの実装にはプレフィックス（接頭辞）が必要。`command_prefix='!'` の設定により `!talk` のように呼び出せる（マインクラフト的に言えば `/kill` の `/` を設定するようなイメージ）。

---

### Step 5. メンション・返信でも呼び出せるようにする

コマンドを毎回打つのは面倒（スマホは特に）。なにより **"其処に居る感"** を大事にしたいので、メンションや返信でも呼べるようにしておく。

```python:discord_bot.py
@client.event
async def on_message(message):
    if client.user in message.mentions and not message.mention_everyone:
        message.content = message.content.replace('<@1373748611866820739>', '')
        await conversation(message)
    await client.process_commands(message)
```

:::message
メンションや返信を読み取って `conversation` 関数を呼び出す。テキストにメンション自体（@ 以降）が含まれるので、GPT のトークン節約のためにこの部分は取り除いておく。コマンド版でも `!talk` 部分は同様に取り除いている。
:::

---

### 動作確認

実際に会話してみると指定した挙動をしているので満足です。

![Discord会話スクリーンショット](/assets/blog/discord_bot/pdf2_p5_discord_chat_screenshot.png)

また、本当は **VOICEVOX** を使って実際にボイスチャンネルでしゃべる機能もあります。

:::message
ただし、説明できるほど理解できていないし、付焼刃的に作成した機能なので音声生成に数秒かかったりとガバガバなため、次回の部誌かブログでお伝えできたらと思います。
:::

---

## 引用・参考文献

@[card](https://www.youtube.com/watch?v=ld1wr1SvaT8)


@[card](https://discord.com/developers/docs/intro)


@[card](https://platform.openai.com/)

