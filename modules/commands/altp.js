/*const endpoint = 'https://api.phamvandien.xyz'
const axios = require('axios')
const APIKEY =  "DismeVIP_4960710288"
module.exports.config = {
  name: "altp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie",
  description: "Game trả lời câu hỏi 'Ai là triệu phú' - D-Jukie",
  commandCategory: "Game",
  usages: "altp",
  cooldowns: 0
}

module.exports.languages = {
  "vi": {
      "APIKEY": 'API KEY không chính xác hoặc đã hết hạn dùng thử!',
      "registerFail": '[👤] Người chơi đã có tài khoản trên máy chủ!',
      "registerSuccess": '[👤] Đăng ký tài khoản trên máy chủ "Ai là triệu phú" thành công',
      "notFoundInfo": '[🚫] Không tìm thấy thông tin của ban, vui lòng đăng ký!\n[⏩] Lệnh: "%1 -r"',
      "showInfo": '[===== Disme Project =====]\n[👤] Tên: %1\n⚡️Số điểm hiện có: %2\n[⚡️] Câu hỏi cao nhất từng trả lời: %3',
      "ranking": '[🏆] Xếp hạng người chơi trên toàn máy chủ\n',
      "errorPlay": '[🚫] Mỗi nhóm chỉ được phép có một người chơi cùng lúc!!',
      "typeQuestion": '[📝] Bạn vui lòng chọn dạng câu hỏi muốn hiển thị:\n1. Văn bản\n2. Hình ảnh\n[⏩] Thực hiện reply tin nhắn này [Number]',
      "default": `[ Disme Project ] • Ai là triệu phú - Game trả lời câu hỏi!\n\n• Đăng ký: ${this.config.name} register\n• Xếp hạng: ${this.config.name} rank\n• Thông tin người chơi: ${this.config.name} info\n• Bắt đầu chơi:  ${this.config.name} play\n\n[💸] Hãy là người đầu tiên trả lời hết 15 câu hỏi của chương trình `,
      "stop": `• Bạn đã quyết định dừng cuộc chơi tại mốc câu hỏi thứ %1!\n• Số tiền bạn nhận được từ chương trình là: %2$`,
      "help": '[📖] Lưu ý: \n• Hãy nhắn \n"stop" để ngừng cuộc chơi\n"help 1" để loại bỏ 2 đáp án sai.(1)\n"help 2" để tạo vote trong group.(unlimited)\n"help 3" để đổi câu hỏi(1)',
      "true": '[🥳] Xin chúc mừng, bạn đã trả lời đúng!',
      "true15": '[🥳] Xin chúc mừng, bạn là người đầu tiên trả lời đúng 15 câu hỏi của chương trình.\n• Số tiền bạn nhận được từ chương trình là: %1$',
      "timeout": `• Hết thời gian, bạn đã không đưa ra được phương án chính xác của chương trình.\n• Bạn dừng cuộc chơi tại câu hỏi thứ %1!\n• Số tiền bạn nhận được từ chương trình là: %2$`,
      "false": `• Thật đáng tiếc, đó không phải phương án chính xác của chương trình.\n• Bạn dừng cuộc chơi tại câu hỏi thứ %1!\n• Số tiền bạn nhận được từ chương trình là: %2$`,
      "notFoundQuestion": "[❎] Câu hỏi này không tồn tại!!"
  },
  "en": {}
}

module.exports.onLoad = function() {
    global.timer = new Object()
    global.quiz = new Object()
}

const download = async (url) => {
  const response = await axios.get(url, {
      responseType: 'stream'
  })
  return response.data
}

const reply = (type, info, event, option) => {
  try {
      var obj = { type: type, name: this.config.name, messageID: info.messageID, author: event.senderID }
      if (option) { obj[option.key] = option.value }
      global.quiz[event.threadID].messageID = info.messageID
  }
  catch(e) {}
  return obj
}

const correct = (id) => {
    clearTimeout(global.timer[id])
    delete global.timer[id]
}
const start = (id, time, api, getText, idPlayer) => {
    global.timer[id] = setTimeout(function () {
        if (!global.quiz[id]) return
        axios.get(`${endpoint}/game/quiz?type=stop&id=${idPlayer}&apikey=${APIKEY}`)
        api.sendMessage(getText("timeout", global.quiz[id].numberQuiz, global.quiz[id].coins), id)
        delete global.quiz[id]
        return
    }, time * 1000)
}

const help = (id, time, api, getText, idPlayer) => {
    correct(id)
    start(id, time, api, getText, idPlayer)
}

async function getQuestion(type, level, id, threadID, api, getText, help) {
  type = String(type)
  level = String(level)
  try {
      if (help == 3) {
          var resp = (await axios.get(`${endpoint}/game/quiz?type=change&id=${id}&typeq=${(global.quiz[threadID].typeQuiz == 1) ? 'text' : 'image'}&apikey=${APIKEY}`)).data
      }
      if (help == 1) {
          var resp = (await axios.get(`${endpoint}/game/quiz?type=5050&typeq=${(global.quiz[threadID].typeQuiz == 1) ? 'text' : 'image'}&id=${global.quiz[threadID].idPlayer}&apikey=${APIKEY}`)).data
          resp.time = 30
      }
      if (!help) {
          var resp = (await axios.get(`${endpoint}/game/quiz?type=altp&level=${level}&id=${id}&typeq=${(global.quiz[threadID].typeQuiz == 1) ? 'text' : 'image'}&apikey=${APIKEY}`)).data
      }
  } catch (e) {
      if(global.tryGet == 1) return
      global.tryGet = 1
      await getQuestion(type, level, id, threadID, api, getText, help)
  }
  switch (type) {
  case '1': {
      if (resp.status == false) { return 3 }
      var ans = resp.dataGame.dapan.map(i => {
          if (i == null) { i = "" }
          return i
      })
      var msg = `❓ Câu hỏi thứ ${resp.dataGame.level} (${resp.time ? resp.time : 60}s) - ${resp.dataGame.coins}$\n${resp.dataGame.question}\nA: ${ans[0]}\nB: ${ans[1]}\nC: ${ans[2]}\nD: ${ans[3]}`
      global.quiz[threadID].help_2 = resp.dataGame
      start(threadID, 60, api, getText, id)
      return { msg, time: resp.dataGame.time, coins: resp.dataGame.coins }
  }
  case '2': {
      if (resp.status == false) { return 3 }
      var msg = { body: `❓ Câu hỏi thứ ${resp.dataGame.level} (${resp.time ? resp.time : 60}s) - ${resp.dataGame.coins}$`, attachment: await download(resp.dataGame.url) }
      global.quiz[threadID].help_2 = resp.dataGame
      start(threadID, 65, api, getText, id)
      return { msg, time: resp.dataGame.time, coins: resp.dataGame.coins }
  }
  default: return
  }
}

module.exports.handleEvent = async ({ event, api, Users, Currencies, getText }) => {
  const { threadID, messageID, senderID, body } = event
  if (!global.quiz || !global.quiz[threadID] || global.quiz[threadID].idPlayer != senderID) return
  switch (body) {
  case 'stop': {
      api.unsendMessage(global.quiz[threadID].messageID)
      await Currencies.increaseMoney(senderID, parseInt(global.quiz[threadID].coins))
      var resp = (await axios.get(`${endpoint}/game/quiz?type=stop&id=${senderID}&apikey=${APIKEY}`)).data
      api.sendMessage(getText("stop", global.quiz[threadID].numberQuiz, global.quiz[threadID].coins), threadID, messageID)
      delete global.quiz[threadID]
      return
  }
  case 'help 1': {
      var question = await getQuestion(global.quiz[threadID].typeQuiz, global.quiz[threadID].numberQuiz, senderID, threadID, api, getText, 1)
      if (question == 3) return api.sendMessage('• Bạn đã hết lượt loại bỏ 2 đáp án sai!', threadID)
      api.unsendMessage(global.quiz[threadID].messageID)
      help(threadID, 30000, api, getText, senderID)
      api.sendMessage(question.msg, threadID, (error, info) => global.client.handleReply.push(reply('ans', info, event, { key: 'time', value: question.time }, event)))
      break
  }
  case 'help 2': {
      var dataGame = global.quiz[threadID].help_2
      api.createPoll(dataGame.question, threadID, {
          [dataGame.dapan[0]]: false,
          [dataGame.dapan[1]]: false,
          [dataGame.dapan[2]]: false,
          [dataGame.dapan[3]]: false
      }, (err) => { if (err) return console.log(err)
      })
      break
  }
  case 'help 3': {
      var question = await getQuestion(global.quiz[threadID].typeQuiz, global.quiz[threadID].numberQuiz, senderID, threadID, api,getText, 3)
      if (question == 3) return api.sendMessage('• Bạn đã hết lượt đổi câu hỏi!', threadID)
      api.unsendMessage(global.quiz[threadID].messageID)
      help(threadID, 60000, api, getText, senderID)
      api.sendMessage(question.msg, threadID, (error, info) => global.client.handleReply.push(reply('ans', info, event, { key: 'time', value: question.time }, event)))
      break
  }
  default: return
  }
}
module.exports.handleReply = async function ({ api, event, handleReply, Currencies, getText }) {
  const { threadID, messageID, senderID, body } = event
  if (handleReply.author != senderID) return
  switch (handleReply.type) {
  case 'choose': {
      global.quiz[threadID] = {}
      global.quiz[threadID].numberQuiz = 1
      global.quiz[threadID].idPlayer = senderID
      global.quiz[threadID].coins = 0
      if (body == 1) {
          api.sendMessage(getText("help"), threadID, messageID)
          await new Promise(resolve => setTimeout(resolve, 200))
          global.quiz[threadID].typeQuiz = 1
      } else if (body == 2) {
          api.sendMessage(getText("help"), threadID, messageID)
          await new Promise(resolve => setTimeout(resolve, 200))
          global.quiz[threadID].typeQuiz = 2
      } else return
  }
  case 'start': {
      api.unsendMessage(handleReply.messageID)
      var question = await getQuestion(global.quiz[threadID].typeQuiz, global.quiz[threadID].numberQuiz, senderID, threadID, api, getText)
      return api.sendMessage(question.msg, threadID, (error, info) => global.client.handleReply.push(reply('ans', info, event, { key: 'time', value: question.time }, event)))
  }
  case 'ans': {
    if(!global.quiz[threadID]) return
      var list = [' ', 'a', 'b', 'c', 'd']
      var check = await checkAns(body.toLowerCase(), senderID, handleReply.time)
      if (list.includes(body.toLowerCase()) && check == true) {
          correct(threadID)
          api.unsendMessage(handleReply.messageID)
          global.quiz[threadID][global.quiz[threadID].numberQuiz] = true
          global.quiz[threadID].numberQuiz = global.quiz[threadID].numberQuiz + 1
          api.sendMessage(getText('true'), threadID, messageID)
          await new Promise(resolve => setTimeout(resolve, 200))
          if (global.quiz[threadID].numberQuiz > 15) {
              await Currencies.increaseMoney(senderID, parseInt(global.quiz[threadID].coins))
              api.sendMessage(getText('true15', global.quiz[threadID].coins), threadID)
              delete global.quiz[threadID]
              return
          }
          var question = await getQuestion(global.quiz[threadID].typeQuiz, global.quiz[threadID].numberQuiz, senderID, threadID, api, getText)
          global.quiz[threadID].coins = question.coins
          return api.sendMessage(question.msg, threadID, (error, info) => global.client.handleReply.push(reply('ans', info, event, { key: 'time', value: question.time })))
      }
      if (list.includes(body.toLowerCase()) && check == false) {
          correct(threadID)
          api.unsendMessage(handleReply.messageID)
          await Currencies.increaseMoney(senderID, parseInt(global.quiz[threadID].coins))
          api.sendMessage(getText("false", global.quiz[threadID].numberQuiz, global.quiz[threadID].coins), threadID, messageID)
          delete global.quiz[threadID]
          return
      }
      if (list.includes(body.toLowerCase()) && check == 404 || check == 503) {
          return api.sendMessage(getText("notFoundQuestion"), threadID, messageID)
      }
  }
  default: return
  }
  async function checkAns(ans, id, time) {
      var resp = (await axios.get(`${endpoint}/game/quiz?type=check&dapan=${ans}&id=${id}&time=${time}&apikey=${APIKEY}`)).data
      return resp.status
  }
}
module.exports.run = async function ({ api, event, args, Users, getText }) {
  const { threadID, messageID, senderID } = event
  const type = args[0]
  const name = (await Users.getData(senderID)).name
  const checkKey = (await axios.get(`${endpoint}/game/quiz?type=info&id=${senderID}&apikey=${APIKEY}`)).data
  if(checkKey.error && checkKey.error == 1) {
      return api.sendMessage(getText("APIKEY"), threadID, messageID)
  }
  switch (type) {
  case 'register':
  case '-r': {
      var resp = await axios.get(`${endpoint}/game/quiz?type=register&name=${encodeURI(name)}&id=${senderID}&apikey=${APIKEY}`)
      if (resp.data.error) return api.sendMessage(getText("registerFail"), threadID, messageID)
      return api.sendMessage(getText("registerSuccess"), threadID, messageID)
  }
  case 'info':
  case '-i': {
      var resp = await axios.get(`${endpoint}/game/quiz?type=info&id=${senderID}&apikey=${APIKEY}`)
      if (resp.data.error) return api.sendMessage(getText("notFoundInfo", this.config.name), threadID, messageID)
      return api.sendMessage(getText("showInfo", resp.data.name, resp.data.point, resp.data.highest_Level), threadID, messageID)
  }
  case 'rank':
  case '-t': {
      var resp = (await axios.get(`${endpoint}/game/quiz?type=rank&apikey=${APIKEY}`)).data
      var result = getText("ranking")
      for (let i = 0; i <= 4; i++) {
          if (!resp.data[i]) continue
          result += `• TOP ${i+1}. ${resp.data[i].name} - ${resp.data[i].point}\n`
      }
      return api.sendMessage({ body: result, attachment: await download(resp.url)}, threadID, messageID)
  }
  case 'play':
  case '-p': {
      if (global.quiz[threadID]) return api.sendMessage(getText("errorPlay"), threadID, messageID)
      var resp = await axios.get(`${endpoint}/game/quiz?type=info&id=${senderID}&apikey=${APIKEY}`)
      if (resp.data.error) return api.sendMessage(getText("notFoundInfo", this.config.name), threadID, messageID)
      return api.sendMessage(getText("typeQuestion"), threadID, (error, info) => global.client.handleReply.push(reply('choose', info, event)), messageID)
  }
  default: return api.sendMessage({ body: getText("default"), attachment: await download("https://i.imgur.com/T1gYRR0.png")}, threadID, messageID)
  }
}*/
const moneydown = 5000; // Sửa số tiền đăng kí chơi tại đây

const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
const { loadImage, createCanvas, registerFont } = require("canvas");
const path = __dirname + "/cache/question.png";
const pathhelp = __dirname + "/cache/helpaltp.png";

module.exports.config = {
  name: "altp",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "Khoa x Nam",
  description: "chương trình Ai Là Triệu Phú siêu khó vip pro",
  commandCategory: "Game",
  usages: "register/play/info/stop",
  cooldowns: 5
};

function equi(level) {
  if (level == 0) var tienthuong = 0;
  if (level == 1) var tienthuong = 200;
  if (level == 2) var tienthuong = 400;
  if (level == 3) var tienthuong = 600;
  if (level == 4) var tienthuong = 1000;
  if (level == 5) var tienthuong = 2000;
  if (level == 6) var tienthuong = 3000;
  if (level == 7) var tienthuong = 6000;
  if (level == 8) var tienthuong = 10000;
  if (level == 9) var tienthuong = 14000;
  if (level == 10) var tienthuong = 22000;
  if (level == 11) var tienthuong = 30000;
  if (level == 12) var tienthuong = 40000;
  if (level == 13) var tienthuong = 80000;
  if (level == 14) var tienthuong = 150000;
  if (level == 15) var tienthuong = 250000;
  return tienthuong;
}

function getlink(helpp, dapan) {
  if (helpp == 1) {
    if (dapan == "A") var link = "https://i.postimg.cc/FKsB9FFL/A.png";
    if (dapan == "B") var link = "https://i.postimg.cc/XJtHcwff/B.png";
    if (dapan == "C") var link = "https://i.postimg.cc/9MDg7x7X/C.png";
    if (dapan == "D") var link = "https://i.postimg.cc/bvCFdXdF/D.png";
  }
  if (helpp == 3) {
    if (dapan == "A") var link = "https://i.postimg.cc/WzjrvzTR/A.png";
    if (dapan == "B") var link = "https://i.postimg.cc/sDjSHMT7/B.png";
    if (dapan == "C") var link = "https://i.postimg.cc/j2XfdTSD/C.png";
    if (dapan == "D") var link = "https://i.postimg.cc/wxcLkXQ9/D.png";
  }
  return link;
}

async function makeWinner(id, lv) {
  var arr = [];
  let canvas = createCanvas(1280, 720);
  let ctx = canvas.getContext("2d");
  let avatar = await loadImage(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`);
  ctx.drawImage(avatar, 351, 75, 566, 566);
  let background = await loadImage("https://i.postimg.cc/gjyHDjYD/winner.png");
  ctx.drawImage(background, 0, 0, 1280, 720);
  var link = [
    "https://i.postimg.cc/6qzBnVGf/lv0.png",
    "https://i.postimg.cc/J7Qrf8dH/lv1.png",
    "https://i.postimg.cc/dttsvfzH/lv2.png",
    "https://i.postimg.cc/xdHYtVzC/lv3.png",
    "https://i.postimg.cc/cLvdtn1f/lv4.png",
    "https://i.postimg.cc/tCSXg5bX/lv5.png",
    "https://i.postimg.cc/d1YFfN29/lv6.png",
    "https://i.postimg.cc/x1Bnv1qh/lv7.png",
    "https://i.postimg.cc/Y287X3h1/lv8.png",
    "https://i.postimg.cc/2yHfVzPH/lv9.png",
    "https://i.postimg.cc/m2DsKHHK/lv10.png",
    "https://i.postimg.cc/4NSgGxvy/lv11.png",
    "https://i.postimg.cc/s2pd5PkG/lv12.png",
    "https://i.postimg.cc/vmRw12Nd/lv13.png",
    "https://i.postimg.cc/KzN6HGvZ/lv14.png",
    "https://i.postimg.cc/fLD4Cts2/lv15.png"
  ];
  let tienthuong = await loadImage(link[lv]);
  ctx.drawImage(tienthuong, 0, 0, 1280, 720);
  fs.writeFileSync(path, canvas.toBuffer("image/png"));
  arr.push(fs.createReadStream(path));
  return arr;
}

module.exports.handleReply = async function ({ event, Users, api, handleReply, Currencies }) {
  if (handleReply.type == "answer") {
    var { threadID, messageID, senderID } = event;
    if (senderID !== handleReply.author) return api.sendMessage("[🐧]➜ Chỗ người khác đang chơi vô duyên thế -.-", threadID, messageID);
    var name = await Users.getNameUser(senderID);
    var senderInfo = await Users.getData(senderID);
    var choose = event.body.toUpperCase();
    var mot = handleReply.one;
    var hai = handleReply.two;
    var ba = handleReply.three;
    var a = handleReply.author;
    var b = handleReply.dapandung;
    var c = handleReply.giaithich;
    var loz = handleReply.link;

    if (choose == "HELP 1" || choose == "HELP1") {
      if (senderInfo.data.helpaltp.helpm !== 1) return api.sendMessage("[🐧]➜ Bạn đã dùng quyền trợ giúp này rồi!", threadID, messageID);
      api.unsendMessage(handleReply.messageID);
      let canvas = createCanvas(588, 375);
      let background = await loadImage(loz);
      let ctx = canvas.getContext("2d");
      ctx.drawImage(background, 0, 0, 588, 375);
      let loaibo1 = await loadImage(getlink(1, mot[0]));
      let loaibo2 = await loadImage(getlink(1, mot[1]));
      ctx.drawImage(loaibo1, 0, 0, 588, 375);
      ctx.drawImage(loaibo2, 0, 0, 588, 375);
      if (senderInfo.data.helpaltp.helpb == 2) {
        let tuvan1 = await loadImage(getlink(3, ba[0]));
        let tuvan2 = await loadImage(getlink(3, ba[1]));
        let tuvan3 = await loadImage(getlink(3, ba[2]));
        ctx.drawImage(tuvan1, 407, 50, 181, 50);
        ctx.drawImage(tuvan2, 407, 100, 181, 50);
        ctx.drawImage(tuvan3, 407, 150, 181, 50);
      }
      fs.writeFileSync(pathhelp, canvas.toBuffer("image/png"));
      senderInfo.data.helpaltp.helpm = 2;
      await Users.setData(senderID, senderInfo);
      var fuckk = `[🐧]➜ Chúng tôi đã nhờ máy tính loại bỏ hai phương án sai là ${mot[0]} và ${mot[1]}`;
      if (senderInfo.data.helpaltp.helph == 1 || senderInfo.data.helpaltp.helpb == 1) fuckk += "\n\n===HELP===";
      if (senderInfo.data.helpaltp.helph == 1) fuckk += '\n[🐧]➜ Reply "help2" ➩ hỏi ý kiến khán giả';
      if (senderInfo.data.helpaltp.helpb == 1) fuckk += '\n[🐧]➜ Reply "help3" ➩ hỏi tổ tư vấn tại chỗ';
      return api.sendMessage({
        body: fuckk,
        attachment: fs.createReadStream(pathhelp)}, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "answer",
            name: this.config.name,
            author: a,
            dapandung: b,
            giaithich: c,
            one: mot,
            two: hai,
            three: ba,
            link: loz,
            level: senderInfo.data.altp.level,
            messageID: info.messageID
          })
        fs.unlinkSync(pathhelp)
      })
    }
    if (senderInfo.data.helpaltp.helpm == 2 && (choose == mot[0] || choose == mot[1])) return api.sendMessage("[⚜️]➜ Đáp án này đã bị loại bỏ!", threadID, messageID);
	 
    if (choose == "HELP 2" || choose == "HELP2") {
      if (senderInfo.data.helpaltp.helph !== 1) return api.sendMessage("[🐧]➜ Bạn đã dùng quyền trợ giúp này rồi!", threadID, messageID);
	  var linkhai = hai.length == 1 ? hai[0] : senderInfo.data.helpaltp.helpm == 2 ? hai[1] : hai[0];
      var down = (await axios.get(linkhai, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathhelp, Buffer.from(down, "utf-8"));
      senderInfo.data.helpaltp.helph = 2;
      await Users.setData(senderID, senderInfo);
      return api.sendMessage({
        body: "[🐧]➜ Đây là kết quả khảo sát ý kiến khán giả!",
        attachment: fs.createReadStream(pathhelp)
      }, threadID, () => fs.unlinkSync(pathhelp), messageID);
    }

    if (choose == "HELP 3" || choose == "HELP3") {
      if (senderInfo.data.helpaltp.helpb !== 1) return api.sendMessage("[🐧]➜ Bạn đã dùng quyền trợ giúp này rồi!", threadID, messageID);
      api.unsendMessage(handleReply.messageID);
      let background = await loadImage(loz);
      let tuvan1 = await loadImage(getlink(3, ba[0]));
      let tuvan2 = await loadImage(getlink(3, ba[1]));
      let tuvan3 = await loadImage(getlink(3, ba[2]));
      let canvas = createCanvas(588, 375);
      let ctx = canvas.getContext("2d");
      ctx.drawImage(background, 0, 0, 588, 375);
      if (senderInfo.data.helpaltp.helpm == 2) {
        let loaibo1 = await loadImage(getlink(1, mot[0]));
        let loaibo2 = await loadImage(getlink(1, mot[1]));
        ctx.drawImage(loaibo1, 0, 0, 588, 375);
        ctx.drawImage(loaibo2, 0, 0, 588, 375);
      }
      ctx.drawImage(tuvan1, 407, 50, 181, 50);
      ctx.drawImage(tuvan2, 407, 100, 181, 50);
      ctx.drawImage(tuvan3, 407, 150, 181, 50);
      fs.writeFileSync(pathhelp, canvas.toBuffer("image/png"));
      senderInfo.data.helpaltp.helpb = 2;
      await Users.setData(senderID, senderInfo);
      var bd = "[🐧]➜ Đây là ý kiến của 3 người trong tổ tư vấn!";
      if (senderInfo.data.helpaltp.helpm == 1 || senderInfo.data.helpaltp.helph == 1) bd += "\n\n===HELP===";
      if (senderInfo.data.helpaltp.helpm == 1)  bd += '\n[🐧]➜ Reply "help1" ➩ 50:50';
      if (senderInfo.data.helpaltp.helph == 1)  bd += '\n[🐧]➜ Reply "help2" ➩ hỏi ý kiến khán giả';
      return api.sendMessage({
        body: bd,
        attachment: fs.createReadStream(pathhelp)}, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "answer",
            name: this.config.name,
            author: a,
            dapandung: b,
            giaithich: c,
            one: mot,
            two: hai,
            three: ba,
            link: loz,
            level: senderInfo.data.altp.level,
            messageID: info.messageID
          })
        fs.unlinkSync(pathhelp)
      })
    }
	
    if (choose !== "A" && choose !== "B" && choose !== "C" && choose !== "D") return api.sendMessage("[🐧]➜ Câu trả lời của bạn không hợp lệ!",threadID, messageID);
    if (choose == handleReply.dapandung) {
      var levelcc = handleReply.level + 1;
      if (levelcc < 15) {
        api.unsendMessage(handleReply.messageID);
        var djtme = levelcc == 1 ? "câu hỏi đầu tiên" : `câu hỏi số ${levelcc}`;
        api.sendMessage(`[🐧]➜ ${choose} là đáp án chính xác, ${handleReply.giaithich}\n\n[🐧]➜ Xin chúc mừng người chơi ${name} đã xuất sắc trả lời đúng ${djtme} nâng mức phần thưởng lên ${equi(levelcc)}$`, threadID, messageID);
        var cauhoi = levelcc + 1;
try {
        const res = await axios.get(`https://raw.githubusercontent.com/KhoaDo472005/ailatrieuphu/main/altp${cauhoi}.json`);
        var x = Math.floor(Math.random() * res.data.allquestion.length);
        var question = res.data.allquestion[x];
        var linkanh = question.link;
        var dapandung = question.dapan;
        var giaithich = question.giaithich;
        var helpmot = question.helpone;
        var helphai = question.helptwo;
        var helpba = question.helpthree;
        senderInfo.data.altp = { level: levelcc, rd: x };
        if (senderInfo.data.helpaltp.helpm == 2) senderInfo.data.helpaltp.helpm = 0;
        if (senderInfo.data.helpaltp.helph == 2) senderInfo.data.helpaltp.helph = 0;
        if (senderInfo.data.helpaltp.helpb == 2) senderInfo.data.helpaltp.helpb = 0;
        await Users.setData(senderID, senderInfo);
        var cc = cauhoi == 5 ? "Câu hỏi cột mốc đầu tiên" : cauhoi == 10 ? "Câu hỏi cột mốc thứ hai" : cauhoi == 15 ? "Câu hỏi cuối cùng" : `Câu hỏi số ${cauhoi}`;
        var lmao = cc !== `Câu hỏi số ${cauhoi}` ? "trị giá" : "nâng mức phần thưởng lên";
        var bruh = `${cc} ${lmao} ${equi(cauhoi)}$`;
        if (senderInfo.data.helpaltp.helpm == 1 || senderInfo.data.helpaltp.helph == 1 || senderInfo.data.helpaltp.helpb == 1) bruh += "\n\n===HELP===";
        if (senderInfo.data.helpaltp.helpm == 1) bruh += '\n[🐧]➜ Reply "help1" ➩ 50:50';
        if (senderInfo.data.helpaltp.helph == 1) bruh += '\n[🐧]➜ Reply "help2" ➩ hỏi ý kiến khán giả';
        if (senderInfo.data.helpaltp.helpb == 1) bruh += '\n[🐧]➜ Reply "help3" ➩ hỏi tổ tư vấn tại chỗ';
        var callback = () => api.sendMessage({
        body: `${bruh}`,
        attachment: fs.createReadStream(path)}, threadID, (error, info) => {
          global.client.handleReply.push({
            type: "answer",
            name: this.config.name,
            author: senderID,
            dapandung: dapandung,
            giaithich: giaithich,
            one: helpmot,
            two: helphai,
            three: helpba,
            link: linkanh,
            level: senderInfo.data.altp.level,
            messageID: info.messageID
          })
        fs.unlinkSync(__dirname + "/cache/question.png")
        })
        return request(linkanh).pipe(fs.createWriteStream(path)).on("close",() => callback());
} catch (error) {
  return api.sendMessage(`[🐧]➜ Đã xảy ra lỗi khi lấy câu hỏi tiếp theo!\n${error}`,threadID);
}
      } else if (levelcc == 15) {
        api.unsendMessage(handleReply.messageID);
        Currencies.increaseMoney(senderID, 250000);
        senderInfo.data.altp = { level: -1, rd: -1 };
        await Users.setData(senderID, senderInfo);
        return api.sendMessage({ body: `[🐧]➜ ${choose} là đáp án chính xác, ${handleReply.giaithich}\n\n[🐧]➜ Xin chúc mừng người chơi ${name} đã xuất sắc vượt qua 15 câu hỏi của chương trình mang về 250000$\n[🐧]➜ Hẹn gặp lại bạn ở chương trình lần sau!`, attachment: await makeWinner(senderID, 15)}, threadID, () => fs.unlinkSync(path), messageID);
      }
    } else {
      api.unsendMessage(handleReply.messageID);
      var level = handleReply.level;
      if (level >= 5 && level < 10) { var tienthuong = 2000; } else if (level >= 10) { var tienthuong = 22000; } else var tienthuong = 0;
      senderInfo.data.altp = { level: -1, rd: -1 };
      await Users.setData(senderID, senderInfo);
      if (tienthuong == 2000) var moc = "đầu tiên", xx = 5;
      if (tienthuong == 22000) var moc = "thứ hai", xx = 10;
      if (moc == "đầu tiên" || moc == "thứ hai") {
        Currencies.increaseMoney(senderID, tienthuong);
        return api.sendMessage({ body:`[🐧]➜ ${choose} là đáp án không chính xác, câu trả lời đúng của chúng ta là ${handleReply.dapandung}, ${handleReply.giaithich}\n\n[🐧]➜ Người chơi của chúng ta đã trả lời sai và ra về với phần thưởng ở mốc ${moc} là ${tienthuong}$\n[🐧]➜ Cảm ơn bạn đã tham gia chương trình, hẹn gặp lại bạn ở chương trình lần sau!`, attachment: await makeWinner(senderID, xx)}, threadID, () => fs.unlinkSync(path), messageID);
      } else {
        return api.sendMessage({ body: `[🐧]➜ ${choose} là đáp án không chính xác, câu trả lời đúng của chúng ta là ${handleReply.dapandung}, ${handleReply.giaithich}\n\n[🐧]➜ Cảm ơn bạn đã tham gia chương trình, hẹn gặp lại bạn ở chương trình lần sau!`, attachment: await makeWinner(senderID, 0)}, threadID, () => fs.unlinkSync(path), messageID); 
      }
    }
  }
}


module.exports.run = async function ({ api, event, args, Currencies, Users}) {
  const { ADMINBOT, PREFIX } = global.config;
  const timeVN = require("moment-timezone").tz("Asia/Ho_Chi_Minh"),
  gio = timeVN.format("HH:mm:ss"),
  ngay = timeVN.format("DD/MM/YYYY")
  const threadSetting = global.data.threadData.get(event.threadID) || {};
  var prefix = threadSetting.PREFIX || PREFIX;
  const { configPath } = global.client;
  delete require.cache[require.resolve(configPath)];
  var config = require(configPath);
  var { threadID, messageID, senderID } = event;
  const dataMoney = await Currencies.getData(senderID);
  const money = dataMoney.money;
  var senderInfo = await Users.getData(senderID);
  var playto = (!senderInfo.data.altp || senderInfo.data.altp.level == -1) ? "bắt đầu chơi (cần đăng kí)" : senderInfo.data.altp.level == 0 ? "bắt đầu chơi" : `chơi tiếp tại câu hỏi số ${senderInfo.data.altp.level}`;
  var msg = "[🐧]=== 『 AI LÀ TRIỆU PHÚ 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆" + "\n\n"
+ prefix + "altp register ➩ đăng kí tham gia chương trình" + "\n"
+ prefix + "altp play ➩ " + playto + "\n"
+ prefix + "altp info ➩ xem thông tin câu hỏi và tiền thưởng" + "\n"
+ prefix + "top [box/sever] ➩ xem xếp hạng level ở box và sever" + "\n"
+ prefix + "altp stop ➩ dừng cuộc chơi và nhận tiền thưởng"
  if (ADMINBOT.includes(senderID)) msg += `\n[🐧]➜ ${prefix}altp setlv [số level] @tag ➩ đặt level của @tag (đặc quyền admin).\n\n`;
  msg += "      ======[ " + gio + " ]=====";
  if (args.length == 0) return api.sendMessage({body:msg, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID); 
  var type = args[0].toLowerCase();
  const allType = ["register","play","info","stop","setlv","top"];
  if (!allType.includes(type)) return api.sendMessage(msg, threadID, messageID);
  
  if (type == "top") {
    if (args.length == 1 || (args[1] !== "box" && args[1] !== "sever")) return api.sendMessage(`[🐧]➜ Cú pháp: ${prefix}altp top [box/sever]`,threadID, messageID);
    var arr = [], count = 0;
    let allID = args[1] == "box" ? (await api.getThreadInfo(threadID)).participantIDs : args[1] == "sever" ? global.data.allUserID : ""
    for (const i of allID) {
      let dataUser = await Users.getData(i)
      var lv = (!dataUser.data.altp || dataUser.data.altp.level == -1) ? 0 : dataUser.data.altp.level;
      arr.push({
        idUser: i,
        nameUser: dataUser.name,
        level: lv
      })
      ++count;
      if (count > 10) break;
    }
    count = 0;
    arr.sort(VC("level"));
    var msg = `BXH ${arr.length} người chơi có level cao nhất ${args[1] == "box" ? "nhóm" : args[1] == "sever" ? "server" : ""}\n\n`.toUpperCase()
    for (const i in arr) {
      msg += `${count == 1 ? "🥇" : count == 2 ? "🥈" : count == 3 ? "🥉" : ""} ${count == 0 ? "🏆" : `[${count}]`}. ${arr[i].nameUser}\n ↝ level: ${arr[i].level}\n`;
      ++count
      if (count >= 10) break;
    }
    api.sendMessage(msg, event.threadID);

    function VC(key) {
      return function(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
        let sos = 0;
        if (a[key] > b[key]) {
          sos = 1
        } else if (a[key] < b[key]) {
          sos = -1
        }
        return sos * -1
      }
    }
  }
  
  if (type == "setlv") {
    try {
      if (!ADMINBOT.includes(event.senderID)) return api.sendMessage("[🐧]➜ Bạn không đủ quyền hạn để dùng tính năng này!", threadID, messageID);
      var lv = parseInt(args[1]);
      if (isNaN(lv) || lv < 0 || lv > 15) return api.sendMessage(`[🐧]➜ Level ${args[1]} không hợp lệ!`, threadID, messageID);
      let mention = Object.keys(event.mentions);
      var arr = [];
      var allName = [];
      if (event.type == 'message_reply') {
        arr.push(event.messageReply.senderID)
      } else if (mention.length != 0) {
        for (var i = 0; i < mention.length; i++) arr.push(mention[i])
      } else arr.push(event.senderID)
      for (var i = 0; i < arr.length; i++) {
        var Info = await Users.getData(arr[i]);
        Info.data.altp = {
          level: lv,
          rd: -1
        };
        await Users.setData(arr[i], Info);
        if (arr[i] == event.senderID) {
          allName.push("bản thân");
        } else allName.push(`${i == 0 ? "" : " "}${Info.name}`)
      }
      return api.sendMessage(`[🐧]➜ Đã đặt level của ${allName} thành ${lv}!`, threadID, messageID);
    } catch (error) {
      return api.sendMessage(`${error}!`, threadID, messageID);
    }
  }

  if (type == "register") {
    if (senderInfo.data.altp && senderInfo.data.altp.level !== -1) return api.sendMessage("[🐧]➜ Bạn đã đăng kí rồi, vui lòng vượt qua hết câu hỏi hoặc dừng cuộc chơi để có thể đăng kí lại!", threadID, messageID);
    if (money < moneydown) return api.sendMessage(`[🐧]➜ Bạn không có đủ ${moneydown} để đăng kí, vui lòng theo thầy Huấn làm ăn bươn chải!`, threadID, messageID);
    return api.sendMessage(`[🐧]➜ Thả icon vào tin nhắn này để xác nhận dùng ${moneydown}$ đăng kí tham gia chương trình!`, threadID, (error, info) => {
      global.client.handleReaction.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "register"
      })
    }, messageID)
  };
  
  if (type == "stop") {
    if (!senderInfo.data.altp || senderInfo.data.altp.level == -1) return api.sendMessage("Bạn chưa đăng kí tham gia chương trình!", threadID, messageID);
    var abc = senderInfo.data.altp.level;
    return api.sendMessage(`[🐧]➜ Thả icon vào tin nhắn này để xác nhận dừng cuộc chơi tại đây và ra về với phần thưởng ${equi(abc)}$`, threadID, (error, info) => {
      global.client.handleReaction.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "stop"
      })
    }, messageID)
  };
  
  if (type == "info") {
    const pathinfo = __dirname + '/cache/info.png';
    if (!senderInfo.data.altp || senderInfo.data.altp.level == -1) {
      var down = (await axios.get("https://i.postimg.cc/gJT4rzCb/chuadangki.png", { responseType: "arraybuffer" })).data;
      fs.writeFileSync(pathinfo, Buffer.from(down, "utf-8"));
      return api.sendMessage({body: `[🐧]➜ Dùng ${prefix}altp register để đăng kí!`, attachment: fs.createReadStream(pathinfo)}, threadID, () => fs.unlinkSync(pathinfo), messageID);
    }
    var lv = senderInfo.data.altp.level;
    let canvas = createCanvas(1149, 1600);
    let ctx = canvas.getContext("2d");
    let avatar = await loadImage(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`);
    ctx.drawImage(avatar, 49, 25, 204, 204);
    var linkinfo = [
      "https://i.postimg.cc/fbM8rgcp/lv0.png",
      "https://i.postimg.cc/jCVXQ8q8/lv1.png",
      "https://i.postimg.cc/Pxx2tpFM/lv2.png",
      "https://i.postimg.cc/RhJdtrm6/lv3.png",
      "https://i.postimg.cc/HWJ1zVs5/lv4.png",
      "https://i.postimg.cc/TPQtMqQw/lv5.png",
      "https://i.postimg.cc/9Xv5nCrk/lv6.png",
      "https://i.postimg.cc/hj6w61Pm/lv7.png",
      "https://i.postimg.cc/4ycMgHmS/lv8.png",
      "https://i.postimg.cc/RVc8pfr3/lv9.png",
      "https://i.postimg.cc/HsGRtzND/lv10.png",
      "https://i.postimg.cc/L4gGfwN3/lv11.png",
      "https://i.postimg.cc/6pcPtXpt/lv12.png",
      "https://i.postimg.cc/BvvVvVjD/lv13.png",
      "https://i.postimg.cc/G3DS9YmM/lv14.png",
      "https://i.postimg.cc/vHd2nB1G/lv15.png"
    ];
    let background = await loadImage(linkinfo[lv]);
    ctx.drawImage(background, 0, 0, 1149, 1600);
    if (senderInfo.data.helpaltp.helpm !== 1 || senderInfo.data.helpaltp.helph !== 1 || senderInfo.data.helpaltp.helpb !== 1) var gachcheo = await loadImage("https://i.postimg.cc/Mp7st8Q1/gachcheo.png");
    if (senderInfo.data.helpaltp.helpm !== 1) ctx.drawImage(gachcheo, 500, 65, 160, 107);
    if (senderInfo.data.helpaltp.helph !== 1) ctx.drawImage(gachcheo, 700, 65, 160, 107);
    if (senderInfo.data.helpaltp.helpb !== 1) ctx.drawImage(gachcheo, 900, 65, 160, 107);
    fs.writeFileSync(pathinfo, canvas.toBuffer("image/png"));
    var sucCak = lv == 0 ? "bắt đầu!" : "tiếp tục!";
    return api.sendMessage({ body: `[🐧]➜ Dùng ${prefix}altp play để ${sucCak}`, attachment: fs.createReadStream(pathinfo)}, threadID, () => fs.unlinkSync(pathinfo), messageID);
  };

  if (type == "play") {
    try {
      if (!senderInfo.data.altp || senderInfo.data.altp.level == -1) return api.sendMessage (`[🐧]➜ Bạn chưa đăng kí tham gia chương trình\n[🐧]➜ Vui lòng dùng "${prefix}altp register" để đăng kí (tốn ${moneydown}$)`, threadID, messageID);
      if (isNaN(senderInfo.data.altp.level)) {
        senderInfo.data.altp = { level: 0, rd: -1 }
        await Users.setData(senderID, senderInfo);
      }
      var level = senderInfo.data.altp.level;
      if (level == 15) {
        var name = await Users.getNameUser(senderID);
        Currencies.increaseMoney(senderID, 250000);
        senderInfo.data.altp = { level: -1, rd: -1 };
        await Users.setData(senderID, senderInfo);
        return api.sendMessage({ body: `[🐧]➜ Xin chúc mừng người chơi ${name} đã xuất sắc vượt qua 15 câu hỏi của chương trình mang về 250000$\n[🐧]➜ Hẹn gặp lại bạn ở chương trình lần sau!`, attachment: await makeWinner(senderID, 15)}, threadID, () => fs.unlinkSync(path), messageID);
      }
      var cauhoi = level + 1;
      const res = await axios.get(`https://raw.githubusercontent.com/KhoaDo472005/ailatrieuphu/main/altp${cauhoi}.json`);
      if (!senderInfo.data.altp.rd || senderInfo.data.altp.rd == -1) {
        var x = Math.floor(Math.random() * res.data.allquestion.length);
        senderInfo.data.altp = { level: level, rd: x };
        await Users.setData(senderID, senderInfo);
      } else var x = senderInfo.data.altp.rd;
      var question = res.data.allquestion[x];
      var linkanh = question.link;
      var dapan = question.dapan;
      var giaithich = question.giaithich;
      var helpmot = question.helpone;
      var helphai = question.helptwo;
      var helpba = question.helpthree;
      var cc = cauhoi == 1 ? "Câu hỏi đầu tiên" : cauhoi == 5 ? "Câu hỏi cột mốc đầu tiên" : cauhoi == 10 ? "Câu hỏi cột mốc thứ hai" : cauhoi == 15 ? "Câu hỏi cuối cùng" : `Câu hỏi số ${cauhoi}`;
      var lmao = cc !== `Câu hỏi số ${cauhoi}` ? "trị giá" : "nâng mức phần thưởng lên";
	  var bruh = `${cc} ${lmao} ${equi(level+1)}$`;
	  if (senderInfo.data.helpaltp.helpm == 1 || senderInfo.data.helpaltp.helph == 1 || senderInfo.data.helpaltp.helpb == 1) bruh += "\n\n===HELP===";
	  if (senderInfo.data.helpaltp.helpm == 1) bruh += '\n[🐧]➜ Reply "help1" ➩ 50:50';
	  if (senderInfo.data.helpaltp.helph == 1) bruh += '\n[🐧]➜ Reply "help2" ➩ hỏi ý kiến khán giả';
      if (senderInfo.data.helpaltp.helpb == 1) bruh += '\n[🐧]➜ Reply "help3" ➩ hỏi tổ tư vấn tại chỗ';
	  
      if (senderInfo.data.helpaltp.helpm !== 2 && senderInfo.data.helpaltp.helph !== 2 && senderInfo.data.helpaltp.helpb !== 2) {
        var callback = () => api.sendMessage({
          body: `${bruh}`,
          attachment: fs.createReadStream(path)}, threadID, (error, info) => {
            global.client.handleReply.push({
            type: "answer",
            name: this.config.name,
            author: senderID,
            dapandung: dapan,
            giaithich: giaithich,
            one: helpmot,
            two: helphai,
            three: helpba,
            link: linkanh,
            level: level,
            messageID: info.messageID
          })
          fs.unlinkSync(path)
        })
        return request(linkanh).pipe(fs.createWriteStream(path)).on("close",() => callback());
      } else {
        api.sendMessage("Đang khôi phục...", threadID, messageID);
        let canvas = createCanvas(588, 375);
        let background = await loadImage(linkanh);
        let ctx = canvas.getContext("2d");
        ctx.drawImage(background, 0, 0, 588, 375);
        if (senderInfo.data.helpaltp.helpm == 2) {
          let loaibo1 = await loadImage(getlink(1, helpmot[0]));
          let loaibo2 = await loadImage(getlink(1, helpmot[1]));
          ctx.drawImage(loaibo1, 0, 0, 588, 375);
          ctx.drawImage(loaibo2, 0, 0, 588, 375);
        }
        if (senderInfo.data.helpaltp.helpb == 2) {
          let tuvan1 = await loadImage(getlink(3, helpba[0]));
          let tuvan2 = await loadImage(getlink(3, helpba[1]));
          let tuvan3 = await loadImage(getlink(3, helpba[2]));
          ctx.drawImage(tuvan1, 407, 50, 181, 50);
          ctx.drawImage(tuvan2, 407, 100, 181, 50);
          ctx.drawImage(tuvan3, 407, 150, 181, 50);
        }
        fs.writeFileSync(path, canvas.toBuffer("image/png"));
        api.sendMessage({
          body: `${bruh}`,
          attachment: fs.createReadStream(path)}, threadID, (error, info) => {
            global.client.handleReply.push({
            type: "answer",
            name: this.config.name,
            author: senderID,
            dapandung: dapan,
            giaithich: giaithich,
            one: helpmot,
            two: helphai,
            three: helpba,
            link: linkanh,
            level: level,
            messageID: info.messageID
            })
            fs.unlinkSync(path)
          })
        if (senderInfo.data.helpaltp.helph == 2) {
          var linkhai = helphai.length == 1 ? helphai[0] : senderInfo.data.helpaltp.helpm == 2 ? helphai[1] : helphai[0];
          var callback = () => api.sendMessage({ body: "[🐧]➜ Đây là kết quả khảo sát ý kiến khán giả tại trường quay!", attachment: fs.createReadStream(pathhelp)}, threadID, () => fs.unlinkSync(pathhelp));
          return request(linkhai).pipe(fs.createWriteStream(pathhelp)).on("close",() => callback());
        }
        return;
      }
    } catch (error) {
      return api.sendMessage(`[🐧]➜ Đã xảy ra lỗi!\n${error}`, threadID, messageID);
    }
  }
}

module.exports.handleReaction = async({ api, event, Threads, handleReaction, Currencies, Users }) => {
  if (event.userID != handleReaction.author) return;
  var senderInfo = await Users.getData(handleReaction.author);
  if (handleReaction.type == "register") {
    const threadSetting = global.data.threadData.get(event.threadID) || {};
    var prefix = threadSetting.PREFIX || global.config.PREFIX;
    api.unsendMessage(handleReaction.messageID);
    Currencies.decreaseMoney(handleReaction.author, moneydown);
    const path1 = __dirname + '/cache/intro.png';
    var down = (await axios.get("https://i.postimg.cc/FH7B0wvY/intronew.png", { responseType: "arraybuffer" })).data;
    fs.writeFileSync(path1, Buffer.from(down, "utf-8"));
    senderInfo.data.altp = { level: 0, rd: -1 };
    senderInfo.data.helpaltp = { helpm: 1, helph: 1, helpb: 1 };
    await Users.setData(handleReaction.author, senderInfo);
    return api.sendMessage({body: `[🐧]➜ Đăng kí thành công, chào mừng bạn đến với chương trình Ai Là Triệu Phú!\n\n[🐧]➜ Dùng "${prefix}altp play" để bắt đầu!`, attachment: fs.createReadStream(path1)}, event.threadID, () => fs.unlinkSync(path1));
  }
  if (handleReaction.type == "stop") {
    api.unsendMessage(handleReaction.messageID);
    var level = senderInfo.data.altp.level;
    var name = await Users.getNameUser(handleReaction.author);
    Currencies.increaseMoney(handleReaction.author,equi(level));
    senderInfo.data.altp = { level: -1, rd: -1 };
    senderInfo.data.helpaltp = { helpm: 0, helph: 0, helpb: 0 };
    await Users.setData(handleReaction.author, senderInfo);
    return api.sendMessage({body: `[🐧]➜ Người chơi ${name} đã vượt qua ${level} câu hỏi, mang về phần thưởng là ${equi(level)}$\n[🐧]➜ Hẹn gặp lại bạn ở chương trình lần sau!`, attachment: await makeWinner(handleReaction.author, level)}, event.threadID, () => fs.unlinkSync(path));
  }
} 