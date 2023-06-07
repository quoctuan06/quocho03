/*module.exports.config = {
	name: "goiprefix",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "tpk", 
	description: "Ghi để biết prefix là gì",
	commandCategory: "Gọi bot",
	usages: "goiprefix",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  const moment = require("moment-timezone");
  const tow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
	var { threadID, messageID, body } = event;
	if (event.body.indexOf("prefix")==0 ||
 (event.body.indexOf("Prefix","lệnh gì","Dùng sao","Lệnh bot là gì vậy")==0)) {    
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
    const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
   var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭'
  if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢'
  if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚'
  if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛'
  if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦'
  if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮'
  if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲'
    let threadSetting = global.data.threadData.get(threadID) || {}; 
  let prefix = threadSetting.PREFIX || PREFIX;
  axios.get('https://docs-api.catteam123.repl.co/images/girl?apikey=JRTvip_JRTvip_2200708248').then(res => {
		let callback = function () {
					api.sendMessage({
						body : `====『 𝗣𝗥𝗘𝗙𝗜𝗫 』====\n━━━━━━━━━━━━━━━━\n[🌟] ➜ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗰𝘂̉𝗮 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝗹𝗮̀: ${global.config.PREFIX}\n[🏘] ➜ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗰𝘂̉𝗮 𝗯𝗼𝘅 𝗹𝗮̀: ${prefix}\n[🌷] ➜ 𝗧𝗜𝗗 𝗯𝗼𝘅: ${event.threadID}\n[💓] ➜ 𝗧𝗲̂𝗻 𝗯𝗼𝘁: ${global.config.BOTNAME}\n━━━━━━━━━━━━━━━━\n ⌈${thu} || ${timeNow}⌋`,
						attachment: fs.createReadStream(__dirname + '/cache/gaidep.jpg')
					}, event.threadID, () => fs.unlinkSync(__dirname + '/cache/gaidep.jpg'), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + '/cache/gaidep.jpg')).on("close", callback);
			})}
}
	module.exports.run = function({ api, event, client, __GLOBAL }) {}*/



/*module.exports.config = {
    name: "goiprefix",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Xem prefix của BOT",
    commandCategory: "Gọi bot",
    usages: "goiprefix",
    cooldowns: 5
}, module.exports.handleEvent = async ({
    event: e,
    api: a,
    Threads: n
}) => {
    var {
        threadID: o,
        messageID: r,
        body: s,
        senderID: t
    } = e;
    if ("ManhG" != this.config.credits) return a.sendMessage("Sai credits!", o, r);

    function i(e) {
        a.sendMessage(e, o, r)
    }
    var d = (await n.getData(o)).data;
    const p = global.data.threadData.get(parseInt(o)) || {};
    ["mpre", "mprefix", "prefix", "dấu lệnh", "prefix của bot là gì", "daulenh"].forEach((e => {
        let a = e[0].toUpperCase() + e.slice(1);
        if (s === e.toUpperCase() | s === e | a === s) {
            const e = p.PREFIX || global.config.PREFIX;
            return null == d.PREFIX ? i(`[ ${e} ]➜ Nhóm chưa xét prefix mới cho bot`) : i("[🍄]➜ prefix là: " + d.PREFIX)
        }
    }))
}, module.exports.run = async ({
    event: e,
    api: a
}) => a.sendMessage("( \\_/)                                                                            ( •_•)                                                                            // >🧠                                                            Đưa não cho bạn lắp vào đầu nè.\nCó biết là lệnh Noprefix hay không?", e.threadID);*/

module.exports.config = {
    name: "prefix",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ManhG",
    description: "Xem prefix của BOT",
    commandCategory: "Gọi bot",
    usages: "goiprefix",
    cooldowns: 5
}, module.exports.handleEvent = async ({
    event: e,
    api: a,
    Threads: n
}) => {
    var {
        threadID: o,
        messageID: r,
        body: s,
        senderID: t
    } = e;
    if ("ManhG" != this.config.credits) return a.sendMessage("Sai credits!", o, r);

    function i(e) {
        a.sendMessage(e, o, r)
    }
    var d = (await n.getData(o)).data;
    const dateNow = Date.now();
    const fast = global.nodemodule["fast-speedtest-api"];
    const speedTest = new fast({
        token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
        verbose: false,
        timeout: 10000,
        https: true,
        urlCount: 5,
        bufferSize: 8,
        unit: fast.UNITS.Mbps
    });
    const resault = await speedTest.getSpeed();
    var tocdo = resault + " Mbps";
    const p = global.data.threadData.get(parseInt(o)) || {};
    ["prefix", "mprefix", "JRT", "dấu lệnh", "prefix của bot là gì", "daulenh", "jrt"].forEach((e => {
        let a = e[0].toUpperCase() + e.slice(1);
        if (s === e.toUpperCase() | s === e | a === s) {
            const e = p.PREFIX || global.config.PREFIX;
            return null == d.PREFIX ? i(`[🐧]=== 『 GỌI PREFIX 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ Prefix BOT : [ ${e} ]\n[🐧]➜ Prefix BOX : [ ` + d.PREFIX + ` ]\n[🐧]➜ Ping : ${Date.now() - dateNow}ms` + `\n[🐧]➜ Tốc Độ Load : ${tocdo}`) : i(`[🐧]➜ Prefix BOT : [ ${e} ]\n[🐧]➜ Prefix BOX : [ ` + d.PREFIX + ` ]\n[🐧]➜ Ping : ${Date.now() -dateNow}ms` + `\n[🐧]➜ Tốc Độ Load : ${tocdo}`)
        }
    }))
}, module.exports.run = async ({
    event: e,
    api: a
}) => a.sendMessage("[🐧]➜ Đây là noprefix !!!!!!", e.threadID);