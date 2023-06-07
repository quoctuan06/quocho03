module.exports.config = {
	name: "ping",
	version: "0.0.3",
	hasPermssion: 1,
	credits: "tpk",
	description: "tag toàn bộ thành viên",
	commandCategory: "Hệ thống quản trị viên",
	usages: "[Text]",
	cooldowns: 10
};

module.exports.run = async function({ api, event, args, Threads, Users }) { 
  let name = await Users.getNameUser(event.senderID);
  const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
  const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss");
    var thu = moment.tz('Asia/Ho_Chi_Minh').format('(LLLL)');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝟐'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝟑'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝟒'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝟓'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝟔'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝟕'
const res = await axios.get("https://docs-api.jrtxtracy.repl.co/images/girl?apikey=JRTvip_2200708248");
//lấy data trên web api
const data = res.data.data;
//tải ảnh xuống
let download = (await axios.get(data, {
			responseType: "stream"
		})).data;
	try {
		var all = (await Threads.getInfo(event.threadID)).participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
	  all.splice(all.indexOf(event.senderID), 1);
		var body = (args.length != 0) ? args.join(" ") : "𝐃𝐚̣̂𝐲 𝐭𝐮̛𝐨̛𝐧𝐠 𝐭𝐚́𝐜 𝐧𝐚̀𝐨 𝐜𝐚́𝐜 𝐜𝐚̣̂𝐮", mentions = [], index = 0;
		
    for (let i = 0; i < all.length; i++) {
		    if (i == body.length) body += body.charAt(body.length );
		    mentions.push({
		  	  tag: body,
		  	  id: all[i],
		  	  fromIndex: i
		    });
	    }

		return api.sendMessage({body: `‎📣====『 𝐓𝐇𝐎̂𝐍𝐆 𝐁𝐀́𝐎 』====📣\n━━━━━━━━━━━━━━━━\n\n[💓] ➜ 𝗧𝗵𝗼̂𝗻𝗴 𝗯𝗮́𝗼 𝘁𝘂̛̀ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 ${name}\n[⏰] ➜ 𝗛𝗼̂𝗺 𝗻𝗮𝘆 𝗹𝗮̀: ${thu} || ${gio}\n[💬] ➜ 𝗡𝗼̣̂𝗶 𝗱𝘂𝗻𝗴: ${body}\n\n[👉] ➜ 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 "❤️" 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗯𝗼𝘁 𝘁𝗮𝗴 𝘁𝗵𝗲̂𝗺 𝗹𝗶𝘀𝘁 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺`, attachment: download, mentions }, event.threadID, (err, info) => {
    global.client.handleReaction.push({
      name: this.config.name, 
      messageID: info.messageID,
      author: event.senderID,
    })
    },event.messageID);
	}
	catch (e) { return console.log(e); }
}
module.exports.handleReaction = async ({ event, api, handleReaction, Currencies, Users}) => {
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const { threadID, messageID, userID } = event;
if (event.userID != handleReaction.author) return;
if (event.reaction != "❤") return; 
//đoạn này code them đoạn tag 
 const moment = require("moment-timezone");
  const táo = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let tpk1 = `🌸 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗰𝗼́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗲̂𝘂 𝗻𝗲̀\n`
  let tpk = `====『 𝗧𝗔𝗚 𝗤𝗨𝗔̉𝗡 𝗧𝗥𝗜̣ 𝗩𝗜𝗘̂𝗡 』====\n➜ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝘁𝗮𝗴 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺\n━━━━━━━━━━━━━━━━━━\n`
 let tpk2 = `\n━━━━━━━━━━━━━━━━━━\n⏰====「${táo}」====⏰`
	const gettext = (await api.getThreadInfo(event.threadID)).adminIDs;
	var id = gettext;
var id = [];
var mentions = [];
for (var i of gettext) {
const admin = i.id;
const name = (await Users.getData(admin)).name;
	id.push(name);
	mentions.push({
		id: admin,
		tag: name
	})
}
return api.sendMessage({body: tpk + tpk1 + id.join('\n') + tpk2 , mentions, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://docs-api.jrtxtracy.repl.co/images/girl?apikey=JRTvip_2200708248')).data.data,
method: "GET",
responseType: "stream"
})).data
 },event.threadID);          
  }; 