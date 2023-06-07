module.exports.config = {
  name: "tinder",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "M-Drasew, HungCho",//fix thêm by tpk 
  commandCategory: "Tình yêu", 
  usages: "tinder", 
  cooldowns: 1
};
module.exports.onLoad = () => {
    const fs = require("fs-extra");
    const request = require("request");
    const dirMaterial = __dirname + `/noprefix/`;
    if (!fs.existsSync(dirMaterial + "noprefix")) fs.mkdirSync(dirMaterial, { recursive: true });
    if (!fs.existsSync(dirMaterial + "tinder.jpeg")) request("https://i.imgur.com/JrjmeEV.jpeg").pipe(fs.createWriteStream(dirMaterial + "tinder.jpeg"));
}
module.exports.run = async ({ api, event, handleReply, Users, Currencies }) => {
const { threadID, messageID, senderID } = event;
  const fs = require("fs");
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
var data = await Currencies.getData(event.senderID);
var money = data.money
if( money < 10) api.sendMessage(`→ 𝗠𝗼̂̃𝗶 𝗹𝗮̂̀𝗻 𝗴𝗵𝗲́𝗽 𝗯𝗮̣𝗻 𝗽𝗵𝗮̉𝗶 𝗰𝗼́ 𝟭𝟬 đ𝗼̂ 💞\n→ 𝗸𝗶𝗲̂́𝗺 đ𝘂̉ đ𝗶 𝗿𝗼̂̀𝗶 𝗴𝗵𝗲𝗽𝗱𝗼𝗶 𝗻𝗵𝗮𝗮 💍\n━━━━━━━━━━━━━━━━━━\n𝗦𝗼̂́ 𝘁𝗶𝗲̂̀𝗻 𝗯𝗮̣𝗻 𝗰𝗼̀𝗻 𝘁𝗿𝗼𝗻𝗴 𝘁𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻: ${money} 💵`,threadID,messageID)
  else {
  Currencies.setData(event.senderID, options = {money: money - 10})
	return api.sendMessage({body: `💓===「 𝗧𝗜𝗡𝗗𝗘𝗥 𝗜𝗡𝗤𝗨𝗜𝗥𝗬 」===💓\n\n→ chuẩn bị ghepdoi/maimoi 💍\n→ bạn hãy Reply tin nhắn này của bot vào chọn giới tính người mà bạn muốn ghép ( Trai hoặc Gái )\n━━━━━━━━━━━━━━━━━━\n→ lưu ý mỗi lần ghepdoi bạn sẽ bị bot trừ 10 money/đô trong tài khoảng 🌸\n━━━━━━━━━━━━━━━━━━\n→ số tiền hiện tại bạn đang có trong tài khoản: ${money} 💵\n\n======『 ${timeNow} 』======`, attachment: fs.createReadStream(__dirname + `/noprefix/tinder.jpeg`)}, event.threadID, (error, info) => {
        global.client.handleReply.push({
            type: "ghep",
            name: this.config.name,
            author: event.senderID,
            messageID: info.messageID
        })  
     })
   }
}
module.exports.handleReply = async ({ api, event, handleReply, Users, Currencies }) => {
  const gai = ["A có thể làm mọi thứ cho e, ngoại trừ việc yêu e lần nữa", "Hạnh phúc của a chính là vì e mà cố gắng, vì e mà thay đổi. E chính là động lực tuyệt vời nhất trong cuộc đời a", "Yêu chính là muốn ở cạnh người đó không rời dù chỉ một phút một giây", "Nhà e có bán rượu không mà sao nói chuyện với e a say quá"];
  const gifCute = ["https://i.imgur.com/rcKI2D5.gif","https://i.imgur.com/3aBMmO9.gif","https://i.imgur.com/P3kqnNp.gif","https://i.imgur.com/BI4DolS.gif","https://i.imgur.com/Y1wTYFN.gif"];
var token = `1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`;
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const tile = (Math.random() * 50)+50;
const random = ["𝗖𝗵𝘂́𝗰 𝟮 𝗯𝗮̣𝗻 𝘁𝗿𝗮̆𝗺 𝗻𝗮̆𝗺 𝗵𝗮̣𝗻𝗵 𝗽𝗵𝘂́𝗰", "𝗖𝗵𝘂́𝗰 𝟮 𝗯𝗮̣𝗻 𝗵𝗮̣𝗻𝗵 𝗳𝘂𝗰𝗸", "𝗖𝗵𝘂́𝗰 𝟮 𝗯𝗮̣𝗻 𝗵𝗮̣𝗻𝗵 𝗽𝗵𝘂́𝗰.!"];
    switch(handleReply.type) {
        case "ghep": {
          switch(event.body) {
              case "trai":
					case "Trai": {
						api.unsendMessage(handleReply.messageID)
            const moment = require("moment-timezone");
  const tpk = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
						api.sendMessage(`🌐====「 𝗧𝗜𝗡𝗗𝗘𝗥 𝗦𝗘𝗔𝗥𝗖𝗛 」====🌐\n\n→ 𝗕𝗼𝘁 đ𝗮𝗻𝗴 𝘁𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗡𝗮𝗺 𝗽𝗵𝘂̀ 𝗵𝗼̛̣𝗽 𝘃𝗼̛́𝗶 𝗯𝗮̣𝗻 🧒...\n→ 𝗹𝗼𝗮𝗱𝗶𝗻𝗴, 𝗰𝗵𝗼̛̀ 𝘅𝗶́𝘂 𝗻𝗵𝗮...!\n━━━━━━━━━━━━━━━━━━\n⏰=====『 ${tpk} 』=====⏰`,event.threadID);
            var ThreadInfo = await api.getThreadInfo(event.threadID);
            var all = ThreadInfo.userInfo
            let data = [];
            for (let male of all) {
                if (male.gender == "MALE") {
                 if ( male != event.senderID) data.push(male.id)   
                }
            }
          let member = data[Math.floor(Math.random() * data.length)]
          let n = (await Users.getData(member)).name
          const url = api.getCurrentUserID(member);
          let Avatar_boy = (await axios.get(`https://graph.facebook.com/${member}/picture?height=1500&width=1500&access_token=`+token, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + `/cache/avt1.png`, Buffer.from(Avatar_boy, "utf-8") );
            let gifLove = (await axios.get(gifCute[Math.floor(Math.random() * gifCute.length)], { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8") );
          let name = await Users.getNameUser(handleReply.author);
          let Avatar_author = (await axios.get( `https://graph.facebook.com/${handleReply.author}/picture?width=512&height=512&access_token=`+token, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar_author, "utf-8") );
           var arraytag = [];
                arraytag.push({id: handleReply.author, tag: name});
                arraytag.push({id: member, tag: n});
           var imglove = []; 
              imglove.push(fs.createReadStream(__dirname + "/cache/avt1.png"));
            imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
           var msg = {body: `💙====『 𝗧𝗜𝗡𝗗𝗘𝗥 𝗟𝗢𝗩𝗘 』====💙\n━━━━━━━━━━━━━━━━━━\n\n→ 𝗧𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 💍\n→ 𝗧𝗶̉ 𝗹𝗲̣̂ 𝗵𝗼̛̣𝗽 𝗻𝗵𝗮𝘂 𝗰𝘂̉𝗮 𝗵𝗮𝗶 𝗯𝗮̣𝗻 𝗹𝗮̀: ${tile.toFixed(2)}% 🧸\n💞 ${random[Math.floor(Math.random() * random.length)]}\n`+n+" "+"💓"+" "+name + ` \n━━━━━━━━━━━━━━━━━━\n`+`${gai[Math.floor(Math.random()*gai.length)]}`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
          } break;
              case "gai":
              case "gái":
          case "Gái": {
						api.unsendMessage(handleReply.messageID);
const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
						api.sendMessage(`🌐====「 𝗧𝗜𝗡𝗗𝗘𝗥 𝗦𝗘𝗔𝗥𝗖𝗛 」====🌐\n\n→ 𝗕𝗼𝘁 đ𝗮𝗻𝗴 𝘁𝗶𝗲̂́𝗻 𝗵𝗮̀𝗻𝗵 𝘁𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗻𝘂̛̃ 𝗽𝗵𝘂̀ 𝗵𝗼̛̣𝗽 𝘃𝗼̛́𝗶 𝗯𝗮̣𝗻 👧...\n→ 𝗹𝗼𝗮𝗱𝗶𝗻𝗴, 𝗰𝗵𝗼̛̀ 𝘅𝗶́𝘂 𝗻𝗵𝗮...!\n━━━━━━━━━━━━━━━━━━\n⏰=====『 ${time} 』=====⏰`,event.threadID);
            var ThreadInfo = await api.getThreadInfo(event.threadID);
            var all = ThreadInfo.userInfo
            let data = [];
            for (let female of all) {
                if (female.gender == "FEMALE") {
                 if ( female != event.senderID) data.push(female.id)   
                }
            }
          let member = data[Math.floor(Math.random() * data.length)]
          let n = (await Users.getData(member)).name
          let Avatar_girl = (await axios.get(`https://graph.facebook.com/${member}/picture?height=1500&width=1500&access_token=`+token, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + `/cache/avt1.png`, Buffer.from(Avatar_girl, "utf-8") );
            let gifLove = (await axios.get(gifCute[Math.floor(Math.random() * gifCute.length)], { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8") );
          let name = await Users.getNameUser(handleReply.author);
          let Avatar_author = (await axios.get( `https://graph.facebook.com/${handleReply.author}/picture?width=512&height=512&access_token=`+token, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/avt2.png", Buffer.from(Avatar_author, "utf-8") );
           var arraytag = [];
                arraytag.push({id: handleReply.author, tag: name});
                arraytag.push({id: member, tag: n});
           var imglove = []; 
              imglove.push(fs.createReadStream(__dirname + "/cache/avt1.png"));
            imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));
           var msg = {body: `💜====『 𝗧𝗜𝗡𝗗𝗘𝗥 𝗟𝗢𝗩𝗘 』====💜\n━━━━━━━━━━━━━━━━━━\n\n→ 𝗧𝗶̀𝗺 𝗸𝗶𝗲̂́𝗺/𝗺𝗮𝗶 𝗺𝗼̂́𝗶 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 💍\n→ 𝗧𝗶̉ 𝗹𝗲̣̂ 𝗵𝗼̛̣𝗽 𝗻𝗵𝗮𝘂 𝗰𝘂̉𝗮 𝗵𝗮𝗶 𝗯𝗮̣𝗻 𝗹𝗮̀: ${tile.toFixed(2)}% 🧸\n💞 ${random[Math.floor(Math.random() * random.length)]}\n`+n+" "+"💓"+" "+name + ` \n━━━━━━━━━━━━━━━━━━\n`+`${gai[Math.floor(Math.random()*gai.length)]}`, mentions: arraytag, attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID);
          } break;
        }
      }
    }
          }