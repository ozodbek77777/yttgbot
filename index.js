const TelegramBot = require("node-telegram-bot-api");
const fs = require("fs");
const ytdl = require("ytdl-core");
const { resolve } = require("path");
const { read, write } = require("./model.js");
require('dotenv').config()
const token = process.env.TOKEN;
console.log(token);
const bot = new TelegramBot(token, { polling: true });
process.env["NTBA_FIX_350"] = 1;

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const data=read('data')
 data.push(msg)

  console.log(data);
  
  write('data',data)
  if (msg.text == "/start") {
    bot.sendMessage(
      chatId, 
      `ASSALOMU ALEKUM ${msg.chat.first_name} MENGA HOHLAGAN YOU TUBE VIDEO KANAL LINKINI JO'NATING`
    );
  }
  if (
    msg.text.includes("https://youtube.com/shorts") ||
    msg.text.includes("https://youtu.be")
  ) {
    await ytdl(msg.text).pipe(fs.WriteStream(`${chatId + "video78"}.mp4`));
    const req = await (
      await ytdl.getBasicInfo(msg.text)
    ).formats.find(
      (format) =>
        format.qualityLabel == "720p" &&
        format.audioQuality == "AUDIO_QUALITY_MEDIUM"
    );
    const req2 = await (
      await ytdl.getInfo(msg.text)
    ).formats.find(
      (find) =>
        find.mimeType == 'audio/mp4; codecs="mp4a.40.2"' &&
        find.audioQuality == "AUDIO_QUALITY_MEDIUM"
    );
    console.log(req2);
    console.log(req.url);
    setTimeout(() => {
      bot.sendAudio(chatId, req2.url, { caption: " mp3" });
      bot.sendVideo(chatId, resolve(chatId + "video78.mp4"), {
        caption: "480p",
      });

      bot.sendVideo(chatId, req.url, {
        caption: "720p",
      });
    }, 8000);
    setTimeout(() => {
      fs.unlinkSync(`${chatId + "video78"}.mp4`);
    }, 10000);
  }else{
    bot.sendMessage(chatId,`ILTIMOS ${msg.chat.first_name} YOU TUBE HAVOLA KIRITING`)
  }

  console.log(msg);
});

// fetch(`https://pixabay.com/api/?key=33229903-801e78fc31f7dd4df5dd9281a&q=${msg.text}&image_type=photo&pretty=true`)
// .then((data)=>data.json())
// .then((data) =>data.hits.map((hit)=>{
//   bot.sendMediaGroup(chatId, [
//     {
//       type: "photo",
//       media:hit.largeImageURL
//     }
// ])
