// const express = require("express");
// const path = require("path");
// const PORT = process.env.PORT || 5000;
// const line = require("@line/bot-sdk");
// const config = {
//   channelAccessToken: process.env.ACCESS_TOKEN,
//   channelSecret: process.env.SECRET_KEY
// };
// const client = new line.Client(config);
// const request = require('request')// 追加
// const userlocalKey = process.env.USERLOCAL_KEY// 追加

// express()
//   .use(express.static(path.join(__dirname, "public")))
//   .set("views", path.join(__dirname, "views"))
//   .set("view engine", "ejs")
//   .get("/", (req, res) => res.render("pages/index"))
//   .get("/g/", (req, res) => res.json({ method: "こんにちは、getさん" }))
//   .post("/p/", (req, res) => res.json({ method: "こんにちは、postさん" }))
//   .post("/hook/", line.middleware(config), (req, res) => lineBot(req, res))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// function lineBot(req, res) {
//   res.status(200).end();
//   // ここから追加
//   const events = req.body.events;
//   const promises = [];
//   for (let i = 0, l = events.length; i < l; i++) {
//     const ev = events[i];
//     promises.push(
//       echoman(ev)
//     );
//   }
//   Promise.all(promises).then(console.log("pass"));
// }

// // 追加
// async function echoman(ev) {
//   // const pro =  await client.getProfile(ev.source.userId);
//   let msg = await conversation(ev.message.text)
//   return client.replyMessage(ev.replyToken, {
//     type: "text",
//     // text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
//     text: msg
//   })
// }


// // -----------以下追加2019年10月15日----------

// function requestSync (options) {
//   return new Promise(function (resolve, reject) {
//     request(options, function (error, respons, body) {
//       if (error) {
//         console.log('[in]requestAsync(): error.')
//         reject(error) // errがあればrejectを呼び出す
//         return
//       }
//       console.log('[in]requestAsync(): ok.')
//       resolve(body) // errがなければ成功とみなしresolveを呼び出す
//     })
//   })
// }

// async function conversation (message) {
//   let options = {
//     url: 'https://chatbot-api.userlocal.jp/api/chat',
//     qs: {
//       message: message,
//       key: userlocalKey
//     },
//     method: 'GET',
//     json: true
//   }
//   let body = await requestSync(options)
//   let msg = body.result
//   console.log(`[in]conversation(): msg = ${msg}`)
//   return msg
// }

const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: process.env.ACCESS_TOKEN,
  channelSecret: process.env.SECRET_KEY
};
const client = new line.Client(config); // 追加

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) => res.render("pages/index"))
  .get("/g/", (req, res) => res.json({ method: "こんにちは、getさん" }))
  .post("/p/", (req, res) => res.json({ method: "こんにちは、postさん" }))
  .post("/hook/", line.middleware(config), (req, res) => lineBot(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function lineBot(req, res) {
  res.status(200).end();
  // ここから追加
  const events = req.body.events;
  const promises = [];
  for (let i = 0, l = events.length; i < l; i++) {
    const ev = events[i];
    promises.push(
      echoman(ev)
    );
  }
  Promise.all(promises).then(console.log("pass"));
}

// 追加
async function echoman(ev) {
  const pro =  await client.getProfile(ev.source.userId);
  return client.replyMessage(ev.replyToken, {
    type: "text",
    text: `${pro.displayName}さん、今「${ev.message.text}」って言いました？`
  })
} 