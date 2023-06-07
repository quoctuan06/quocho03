module.exports.config = {
	name: "tagqtv",
	version: "2.0",
	hasPermssion: 1,
	credits: "Tpk",
	description: "Kêu gọi tất cả quản trị viên tronh nhóm bạn",
	commandCategory: "Hệ thống quản trị viên",
	usages: "tagqtv"
};
module.exports.run = async function({ api, event, args, models, Users, Threads, Currencies, permssion }) {
  const moment = require("moment-timezone");
  const táo = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  let tpk1 = `🌸 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗰𝗼́ 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗸𝗲̂𝘂 𝗻𝗲̀\n`
  let tpk = `====『 𝗧𝗔𝗚 𝗤𝗨𝗔̉𝗡 𝗧𝗥𝗜̣ 𝗩𝗜𝗘̂𝗡 』====\n→ 𝗕𝗼𝘁 𝘃𝘂̛̀𝗮 𝘁𝗮𝗴 𝘁𝗮̂́𝘁 𝗰𝗮̉ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺\n━━━━━━━━━━━━━━━━━━\n`
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
url: (await global.nodemodule["axios"]('https://docs-api.jrtxtracy.repl.co/images/wallpaper?apikey=JRTvip_2200708248')).data.data,
method: "GET",
responseType: "stream"
})).data
 },event.threadID);          
  }; 