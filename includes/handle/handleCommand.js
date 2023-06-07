module.exports = function ({ api, event, args, models, Users, Threads, Currencies }) {
  const fs = require("fs");
  const stringSimilarity = require('string-similarity'),
    escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    logger = require("../../utils/log.js");
  const axios = require('axios');
  const request = require('request');
  const moment = require("moment-timezone");
  return async function ({ event }) {
    const dateNow = Date.now()
    const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss | DD/MM/YYYY");
    const { allowInbox, PREFIX, ADMINBOT, NDH, DeveloperMode, adminOnly, keyAdminOnly, ndhOnly,adminPaseOnly } = global.config;
    const { userBanned, threadBanned, threadInfo, threadData, commandBanned } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {}
    const prefixRegex = new RegExp(`^(<@!?${senderID}>|${escapeRegex((threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : PREFIX)})\\s*`);
    if (!prefixRegex.test(body)) return;
    const adminbot = require('./../../config.json');
    
    if(!global.data.allThreadID.includes(threadID) && !ADMINBOT.includes(senderID) && adminbot.adminPaseOnly == true) {
  return api.sendMessage({body: "[🐧]=== 『 CatEmpress 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n\n[🐧]➜ Chỉ ADMINBOT mới được sử dụng bot trong chat riêng.", attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
}    
    if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true) {
      if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true) return api.sendMessage({
    body: '[🐧]=== 『 CatEmpress 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ Chỉ ADMINBOT mới có thể sử dụng bot', attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
    }
     if (!NDH.includes(senderID) && !ADMINBOT.includes(senderID) && adminbot.ndhOnly == true) { 
          return api.sendMessage({body: '[🐧]=== 『 CatEmpress 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ Chỉ SUPPORTBOT mới có thể sử dụng bot', attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);

        }
const dataAdbox = require('./../../modules/commands/cache/data.json');
    var threadInf = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const findd = threadInf.adminIDs.find(el => el.id == senderID);
   if (dataAdbox.adminbox.hasOwnProperty(threadID) && dataAdbox.adminbox[threadID] == true && !ADMINBOT.includes(senderID) && !findd && event.isGroup == true && !NDH.includes(senderID) && !findd && event.isGroup == true) return api.sendMessage({body: '[🐧]=== 『 CatEmpress 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ Hiện tại đang kích hoạt chế độ Quản trị viên, chỉ Quản trị viên được sử dụng Bot', attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
    if (userBanned.has(senderID) || threadBanned.has(threadID) || allowInbox == ![] && senderID == threadID) {
      if (!ADMINBOT.includes(senderID.toString()) && !NDH.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(global.getText("handleCommand", "userBanned", reason, dateAdded), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(global.getText("handleCommand", "threadBanned", reason, dateAdded), threadID, async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000));
              return api.unsendMessage(info.messageID);
            }, messageID);
          }
        }
      }
    }
    const [matchedPrefix] = body.match(prefixRegex),
      args = body.slice(matchedPrefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);
    if (!command) {
      var allCommandName = [];
      const commandValues = commands['keys']();
      for (const cmd of commandValues) allCommandName.push(cmd)
      const checker = stringSimilarity.findBestMatch(commandName, allCommandName)
      const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
      const time = process.uptime();
		 var hours = Math.floor(time / (60 * 60));
		var minutes = Math.floor((time % (60 * 60)) / 60);
	var seconds = Math.floor(time % 60);
      const res = await axios.get(`https://docs-api.jrtxtracy.repl.co/saying/hearing?apikey=JRTvip_2200708248`);
var tpk = res.data.data;
      const allicon = ["💞","💖","💗","💜","🌸","💗","💝","🎀","🌹","🍁","🎊","🌟","🍁"];
const icon = allicon[Math.floor(Math.random()*allicon.length)];
      if (checker.bestMatch.rating >= 0.5) command = client.commands.get(checker.bestMatch.target);
      else return api.sendMessage({body: global.getText("handleCommand", "commandNotExist", checker.bestMatch.target, timeNow, tpk, hours, minutes, seconds,icon,commandName),
attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
      
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandThreadBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000))
            return api.unsendMessage(info.messageID);
          }, messageID);
        if (banUsers.includes(command.config.name))
          return api.sendMessage(global.getText("handleCommand", "commandUserBanned", command.config.name), threadID, async (err, info) => {
            await new Promise(resolve => setTimeout(resolve, 5 * 1000));
            return api.unsendMessage(info.messageID);
          }, messageID);
      }
    }
    if (command.config.commandCategory.toLowerCase() == 'nsfw' && !global.data.threadAllowNSFW.includes(threadID) && !ADMINBOT.includes(senderID))
      return api.sendMessage(global.getText("handleCommand", "threadNotAllowNSFW"), threadID, async (err, info) => {

        await new Promise(resolve => setTimeout(resolve, 5 * 1000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 = (threadInfo.get(threadID) || await Threads.getInfo(threadID))
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText("handleCommand", "cantGetInfoThread", "error"));
      }
       var permssion = 0;
    var threadInfoo = (threadInfo.get(threadID) || await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (ADMINBOT.includes(senderID.toString())) permssion = 3;
    else if (NDH.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && find) permssion = 1;
    var quyenhan = ""
    if (command.config.hasPermssion == 1 ){
      quyenhan = "Quản Trị Viên, SUPPORTBOT và ADMINBOT"
    } else if (command.config.hasPermssion == 2 ) {
      quyenhan = "SUPPORTBOT và ADMINBOT"
    } else if(command.config.hasPermssion == 3) {
      quyenhan = "ADMINBOT"
    }
    if (command.config.hasPermssion > permssion) return api.sendMessage({body: `『 𝗟𝗘̣̂𝗡𝗛 𝗔𝗗𝗠𝗜𝗡/𝗤𝗧𝗩 』\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ 𝗕𝗮̣𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗱𝘂̀𝗻𝗴 𝗹𝗲̣̂𝗻𝗵 𝗻𝗮̀𝘆\n[🐧]➜ 𝗟𝗲̣̂𝗻𝗵 ${command.config.name} 𝗰𝗵𝗶̉ 𝗰𝗼́ 𝗻𝗵𝘂̛̃𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗾𝘂𝘆𝗲̂̀𝗻 𝗵𝗮̣𝗻 𝗻𝗵𝘂̛ 𝗹𝗮̀: ${quyenhan} 𝗺𝗼̛́𝗶 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 💜`, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);
       if (!client.cooldowns.has(command.config.name)) client.cooldowns.set(command.config.name, new Map());
        const timestamps = client.cooldowns.get(command.config.name);;
        const expirationTime = (command.config.cooldowns || 1) * 1000;
      const tp = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
        if (timestamps.has(senderID) && dateNow < timestamps.get(senderID) + expirationTime) 
      return api.sendMessage({body:`===『 𝗧𝗜𝗠𝗘 𝗖𝗛𝗢̛̀ 𝗟𝗘̣̂𝗡𝗛 』===\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ Lệnh ${command.config.name} bạn đang sử dụng có thời gian chờ là: ${command.config.cooldowns}s\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ Tránh để bot bị spam bạn vui lòng chờ ${((timestamps.get(senderID) + expirationTime - dateNow)/1000).toString().slice(0, 5)}s và sử dụng lại sau !!!\n\n===「${tp}」===`, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
}, event.threadID);

    var getText2;
      if (command.languages && typeof command.languages == 'object' && command.languages.hasOwnProperty(global.config.language))
        getText2 = (...values) => {
          var lang = command.languages[global.config.language][values[0]] || '';
          for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
            const expReg = RegExp('%' + i, 'g');
            lang = lang.replace(expReg, values[i]);
          }
          return lang;
        };
      else getText2 = () => { };
      try {
        const Obj = {};
        Obj.api = api
        Obj.event = event
        Obj.args = args
        Obj.models = models
        Obj.Users = Users
        Obj.Threads = Threads
        Obj.Currencies = Currencies
        Obj.permssion = permssion
        Obj.getText = getText2
        command.run(Obj);
        timestamps.set(senderID, dateNow);
        if (DeveloperMode == !![])
          logger(global.getText("handleCommand", "executeCommand", time, commandName, senderID, threadID, args.join(" "), (Date.now()) - dateNow), "MODE");
        return;
      } catch (e) {
        return api.sendMessage(global.getText("handleCommand", "commandError", commandName, e), threadID);
      }
    };
  };