module.exports.config = {
	name: "checktt", // Tên lệnh, được sử dụng trong việc gọi lệnh
	version: "1.0.1", // phiên bản của module này
	hasPermssion: 0, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
	credits: "DungUwU && Nghĩa", // Công nhận module sở hữu là ai
	description: "Check tương tác ngày/tuần/toàn bộ", // Thông tin chi tiết về lệnh
	commandCategory: "Thống kê", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
	usages: "< all/week/day >", // Cách sử dụng lệnh
	cooldowns: 5, // Thời gian một người có thể lặp lại lệnh
	dependencies: {
		"fs": " ",
		"moment-timezone": " "
	}
};

const path = __dirname + '/cache/checktt/';
const moment = require('moment-timezone');

module.exports.onLoad = () => {
	const fs = require('fs');
	if (!fs.existsSync(path) || !fs.statSync(path).isDirectory()) {
		fs.mkdirSync(path, { recursive: true });
	}
	setInterval(() => {
		const today = moment.tz("Asia/Ho_Chi_Minh").day();
		const checkttData = fs.readdirSync(path);
		checkttData.forEach(file => {
			let fileData = JSON.parse(fs.readFileSync(path + file));
			if (fileData.time != today) {
				setTimeout(() => {
					fileData = JSON.parse(fs.readFileSync(path + file));
					if (fileData.time != today) {
						fileData.time = today;
						fs.writeFileSync(path + file, JSON.stringify(fileData, null, 4));
					}
				}, 60 * 1000);
			}
		});
	}, 60 * 1000);
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
	if (global.client.sending_top == true)
		return;
	const fs = global.nodemodule['fs'];
	const { threadID, senderID } = event;
	const today = moment.tz("Asia/Ho_Chi_Minh").day();

	if (!fs.existsSync(path + threadID + '.json')) {
		const newObj = {
			total: [],
			week: [],
			day: [],
			time: today
		};
		fs.writeFileSync(path + threadID + '.json', JSON.stringify(newObj, null, 4));
		const threadInfo = await Threads.getInfo(threadID) || {};
		if (threadInfo.hasOwnProperty('isGroup') && threadInfo.isGroup) {
			const UserIDs = threadInfo.participantIDs;
			for (const user of UserIDs) {
				if (!newObj.total.find(item => item.id == user)) {
					newObj.total.push({
						id: user,
						count: 0
					});
				}
				if (!newObj.week.find(item => item.id == user)) {
					newObj.week.push({
						id: user,
						count: 0
					});
				}
				if (!newObj.day.find(item => item.id == user)) {
					newObj.day.push({
						id: user,
						count: 0
					});
				}
			}
		}
		fs.writeFileSync(path + threadID + '.json', JSON.stringify(newObj, null, 4));
	}
	const threadData = JSON.parse(fs.readFileSync(path + threadID + '.json'));
	if (threadData.time != today) {
		global.client.sending_top = true;
		setTimeout(() => global.client.sending_top = false, 5 * 60 * 1000);
	}
	const userData_week_index = threadData.week.findIndex(e => e.id == senderID);
	const userData_day_index = threadData.day.findIndex(e => e.id == senderID);
	const userData_total_index = threadData.total.findIndex(e => e.id == senderID);
	if (userData_total_index == -1) {
		threadData.total.push({
			id: senderID,
			count: 1
		});
	} else threadData.total[userData_total_index].count++;
	if (userData_week_index == -1) {
		threadData.week.push({
			id: senderID,
			count: 1
		});
	} else threadData.week[userData_week_index].count++;
	if (userData_day_index == -1) {
		threadData.day.push({
			id: senderID,
			count: 1
		});
	} else threadData.day[userData_day_index].count++;
	// if (threadData.time != today) {
	//     threadData.day.forEach(e => {
	//         e.count = 0;
	//     });
	//     if (today == 1) {
	//         threadData.week.forEach(e => {
	//             e.count = 0;
	//         });
	//     }
	//     threadData.time = today;
	// }

	fs.writeFileSync(path + threadID + '.json', JSON.stringify(threadData, null, 4));
};

module.exports.run = async function ({ api, event, args, Users }) {
	const threadInfo = await api.getThreadInfo(event.threadID);
	await new Promise(resolve => setTimeout(resolve, 500));
	const fs = global.nodemodule['fs'];
	const { threadID, senderID, mentions } = event;
	if (!fs.existsSync(path + threadID + '.json')) {
		return api.sendMessage("Chưa có thống kê dữ liệu", threadID);
	}
	const threadData = JSON.parse(fs.readFileSync(path + threadID + '.json'));
	const query = args[0] ? args[0].toLowerCase() : '';

	if (query == 'locmem') {
		const threadInfo = await api.getThreadInfo(threadID);
		if (!threadInfo.adminIDs.some(e => e.id == senderID)) return api.sendMessage("[🐧]➜ Bạn không có quyền sử dụng lệnh này", threadID);
		if (!threadInfo.isGroup) return api.sendMessage("[🐧] ➜ Chỉ có thể sử dụng trong nhóm", threadID);
		if (!threadInfo.adminIDs.some(e => e.id == api.getCurrentUserID())) return api.sendMessage("[🐧] ➜ Bot cần qtv để thực hiện lệnh", threadID);
		if (!args[1] || isNaN(args[1])) return api.sendMessage("Error", threadID);
		const minCount = args[1],
			allUser = threadInfo.participantIDs;
		for (const user of allUser) {
			if (user == api.getCurrentUserID()) continue;
			if (!threadData.total.some(e => e.id == user) || threadData.total.find(e => e.id == user).count < minCount) {
				setTimeout(async () => {
					await api.removeUserFromGroup(user, threadID);
					for (const e in threadData) {
						if (e == 'time') continue;
						if (threadData[e].some(e => e.id == user)) {
							threadData[e].splice(threadData[e].findIndex(e => e.id == user), 1);
						}
					}
				}, 1000);
			}
		}
		return api.sendMessage(`[🐧] ➜ Đã xóa ${allUser.length - threadData.total.filter(e => e.count >= minCount).length} thành viên không đủ ${minCount} lần`, threadID);
	}

	let header = '',
		body = '',
		footer = '',
		msg = '',
		count = 1,
		storage = [],
		data = 0;
	if (query == 'all' || query == '-a') {
		header = '===𝗧𝗨̛𝗢̛𝗡𝗚 𝗧𝗔́𝗖 𝗔𝗟𝗟===\n';
		data = threadData.total;
	} else if (query == 'week' || query == '-w') {
		header = '===𝗧𝗨̛𝗢̛𝗡𝗚 𝗧𝗔́𝗖 𝗧𝗨𝗔̂̀𝗡===\n';
		data = threadData.week;
	} else if (query == 'day' || query == '-d') {
		header = '===𝗧𝗨̛𝗢̛𝗡𝗚 𝗧𝗔́𝗖 𝗡𝗚𝗔̀𝗬===\n';
		data = threadData.day;
	} else {
		data = threadData.total;
	}
	for (const item of data) {
		const userName = await Users.getNameUser(item.id) || 'Tên không tồn tại';
		const itemToPush = item;
		itemToPush.name = userName;
		storage.push(itemToPush);
	}
	const check = ['all', '-a', 'week', '-w', 'day', '-d'].some(e => e == query);
	if (!check && Object.keys(mentions).length > 0) {
		storage = storage.filter(e => mentions.hasOwnProperty(e.id));
	}
	//sort by count from high to low if equal sort by name
	storage.sort((a, b) => {
		if (a.count > b.count) {
			return -1;
		}
		else if (a.count < b.count) {
			return 1;
		} else {
			return a.name.localeCompare(b.name);
		}
	});
	if ((!check && Object.keys(mentions).length == 0) || (!check && Object.keys(mentions).length == 1) || (!check && event.type == 'message_reply')) {
		const UID = event.messageReply ? event.messageReply.senderID : Object.keys(mentions)[0] ? Object.keys(mentions)[0] : senderID;
		const userRank = storage.findIndex(e => e.id == UID);
		const userTotal = threadData.total.find(e => e.id == UID) ? threadData.total.find(e => e.id == UID).count : 0;
		const userTotalWeek = threadData.week.find(e => e.id == UID) ? threadData.week.find(e => e.id == UID).count : 0;
		const userTotalDay = threadData.day.find(e => e.id == UID) ? threadData.day.find(e => e.id == UID).count : 0;
		const nameUID = storage[userRank].name || 'Tên không tồn tại';
		const target = UID == senderID ? 'Bạn' : nameUID;
		const moment = require("moment-timezone");
		let permission;
		if (global.config.ADMINBOT.includes(UID)) permission = `Admin Bot`;
		else if
			(global.config.NDH.includes(UID))
			permission = `Người Hỗ Trợ`; else if (threadInfo.adminIDs.some(i => i.id == UID)) permission = `Quản Trị Viên`; else permission = `Thành Viên`;
		let thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
		if (thu == 'Sunday') thu = '𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭';
		if (thu == 'Monday') thu = '𝐓𝐡𝐮̛́ 𝐇𝐚𝐢';
		if (thu == 'Tuesday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚';
		if (thu == 'Wednesday') thu = '𝐓𝐡𝐮̛́ 𝐓𝐮̛';
		if (thu == "Thursday") thu = '𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦';
		if (thu == 'Friday') thu = '𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮';
		if (thu == 'Saturday') thu = '𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲';
		const threadName = threadInfo.threadName;
		if (userRank == -1) {
			return api.sendMessage(`➜ ${target} chưa có thống kê dữ liệu`, threadID);
		}
		body +=
			"==== [ 𝗖𝗛𝗘𝗖𝗞 𝗧𝗨̛𝗢̛𝗡𝗚 𝗧𝗔́𝗖 ] ====="
			+ "\n━━━━━━━━━━━━━━━━━━"
			+ `\n[👤] ➜ 𝗡𝗮𝗺𝗲: ${nameUID}`
			+ `\n[🌸] ➜ 𝗜𝗗: ${event.senderID}`
			+ `\n[💓] ➜ 𝗖𝗵𝘂̛́𝗰 𝘃𝘂̣: ${permission}`
			+ `\n[🔰] ➜ 𝗧𝗲̂𝗻 𝗻𝗵𝗼́𝗺: ${threadName}`
			+ `\n━━━━━━━━━━━━━━━━━━`
			+ `\n[💌] ➜ 𝗧𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝗿𝗼𝗻𝗴 𝗻𝗴𝗮̀𝘆: ${userTotalDay}`
			+ `\n[💓] ➜ 𝗛𝗮̣𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝗻𝗴𝗮̀𝘆: ${count++}`
			+ `\n[💬] ➜ 𝗧𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝘁𝗿𝗼𝗻𝗴 𝘁𝘂𝗮̂̀𝗻: ${userTotalWeek}`
			+ `\n[🧸] ➜ 𝗛𝗮̣𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝘁𝘂𝗮̂̀𝗻: ${count++}`
			+ `\n[📚] ➜ 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻: ${userTotal}`
			+ `\n[🥇] ➜ 𝗛𝗮̣𝗻𝗴 𝘁𝗼̂̉𝗻𝗴:  ${userRank + 1}`
			+ `\n━━━━━━━━━━━━━━━━━━`
			+ `\n[💮] ➜ 𝗡𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗼́𝗺 𝗯𝗮̣𝗻 𝘁𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 "❤" 𝘃𝗮̀𝗼 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗰𝘂̉𝗮 𝗯𝗼𝘁`.replace(/^ +/gm, '');
	} else {
		body = storage.map(item => {
			return `${count++}. ${item.name} (${item.count})`;
		}).join('\n');
		footer = `➜ Tổng Tin Nhắn: ${storage.reduce((a, b) => a + b.count, 0)}`;
	}
	async function streamURL(url, mime = 'jpg') {
		const dest = `${__dirname}/cache/${Date.now()}.${mime}`,
			downloader = require('image-downloader'),
			fse = require('fs-extra');
		await downloader.image({
			url, dest
		});
		setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
		return fse.createReadStream(dest);
	}
	msg = `${header}\n${body}\n${footer}`;
	api.sendMessage({
		body: msg,
		attachment: [
			await streamURL(threadInfo.imageSrc),
			await streamURL(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)
		]
	}, threadID, (err, info) => {
		global.client.handleReaction.push({
			name: this.config.name,
			messageID: info.messageID,
			author: event.senderID
		});
	}, event.messageID);
};


module.exports.handleReaction = async ({ event, api, handleReaction, Users }) => {
	const { threadID, messageID, userID, body } = event;
	const moment = require("moment-timezone");
	const gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
	let thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
	if (thu == 'Sunday') thu = 'Chủ Nhật';
	if (thu == 'Monday') thu = 'Thứ Hai';
	if (thu == 'Tuesday') thu = 'Thứ Ba';
	if (thu == 'Wednesday') thu = 'Thứ Tư';
	if (thu == "Thursday") thu = 'Thứ Năm';
	if (thu == 'Friday') thu = 'Thứ Sáu';
	if (thu == 'Saturday') thu = 'Thứ Bảy';
	async function streamURL(url, mime = 'jpg') {
		const dest = `${__dirname}/cache/${Date.now()}.${mime}`,
			downloader = require('image-downloader'),
			fse = require('fs-extra');
		await downloader.image({
			url, dest
		});
		setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
		return fse.createReadStream(dest);
	}
	if (event.userID != handleReaction.author) return;
	if (event.reaction != "❤") return;
	api.unsendMessage(handleReaction.messageID);
	const msg = `=== [ 𝗠𝗘𝗡𝗨 𝗧𝗛𝗢̂𝗡𝗚 𝗧𝗜𝗡 ] ===\n━━━━━━━━━━━━━━━━━━\n𝟭. 𝗫𝗲𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗼́𝗺 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻\n𝟮. 𝗧𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗹𝗶𝗲̂𝗻 𝗵𝗲̣̂ 𝗮𝗱𝗺𝗶𝗻 𝗯𝗼𝘁\n𝟯. 𝗟𝗼̣𝗰 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸\n𝟰. 𝗧𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝘃𝗲̂̀ 𝗯𝗼𝘁 \n𝟱. 𝗟𝗮̂́𝘆 𝗨𝗜𝗗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻\n\n[🐧] ➜ 𝗥𝗲𝗽𝗹𝘆 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝘁𝗵𝗲𝗼 𝘀𝗼̂́ đ𝗲̂̉ 𝘅𝗲𝗺 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗯𝗮̣𝗻 𝗺𝘂𝗼̂́𝗻 𝘅𝗲𝗺\n━━━━━━━━━━━━━━━\n===「${thu} || ${gio}」===`;
	return api.sendMessage({
		body: msg, attachment:
			await streamURL(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)
	}, event.threadID, (error, info) => {
		global.client.handleReply.push({
			type: "choosee",
			name: this.config.name,
			author: event.senderID,
			messageID: info.messageID
		});
	}, event.messageID);
};

module.exports.handleReply = async function ({ args, event, Users, api, handleReply, Currencies }) {
	const axios = require("axios");
	const fs = require("fs-extra");
	api.sendMessage(`[🐧] ➜ Vui lòng chờ 1 xíu !!!`, event.threadID, (err, info) =>
		setTimeout(() => { api.unsendMessage(info.messageID) }, 100000));
	const request = require("request");
	const nameUser = (await Users.getData(event.senderID)).name || (await Users.getInfo(envent.senderID)).name;
	let data = (await Currencies.getData(event.senderID)).ghepTime;


	switch (handleReply.type) {
		case "choosee": {
			switch (event.body) {
				case "1": {
					async function streamURL(url, mime = 'jpg') {
						const dest = `${__dirname}/cache/${Date.now()}.${mime}`,
							downloader = require('image-downloader'),
							fse = require('fs-extra');
						await downloader.image({
							url, dest
						});
						setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
						return fse.createReadStream(dest);
					}
					const { threadID, messageID, userID } = event;
					let threadInfo = await api.getThreadInfo(event.threadID);
					let threadName = threadInfo.threadName;
					let id = threadInfo.threadID;
					let sex = threadInfo.approvalMode;
					var pd = sex == false ? 'Tắt' : sex == true ? 'Bật' : '\n';
					let qtv = threadInfo.adminIDs.length;
					let color = threadInfo.color;
					let icon = threadInfo.emoji;
					let threadMem = threadInfo.participantIDs.length;
					api.unsendMessage(handleReaction.messageID);
					var msg = `=====「 𝗧𝗛𝗢̂𝗡𝗚 𝗧𝗜𝗡 𝗡𝗛𝗢́𝗠 」=====\n\n[🏘️] ➜ 𝗧𝗲̂𝗻 𝗻𝗵𝗼́𝗺: ${threadName}\n[⚙️] ➜ 𝗜𝗗 𝗻𝗵𝗼́𝗺: ${id}\n[👥] ➜ 𝗦𝗼̂́ 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝗻𝗵𝗼́𝗺: ${threadMem}\n[💞] ➜ 𝗤𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘃𝗶𝗲̂𝗻: ${qtv}\n[🌷] ➜ 𝗣𝗵𝗲̂ 𝗱𝘂𝘆𝗲̣̂𝘁: ${pd}\n[😻] ➜ 𝗕𝗶𝗲̂̉𝘂 𝘁𝘂̛𝗼̛̣𝗻𝗴 𝗰𝗮̉𝗺 𝘅𝘂́𝗰: ${icon ? icon : 'Không sử dụng'}\n[💝] ➜ 𝗠𝗮̃ 𝗴𝗶𝗮𝗼 𝗱𝗶𝗲̣̂𝗻: ${color}\n━━━━━━━━━━━━━━━━━━\n[🍑] ➜ 𝗧𝗼̂̉𝗻𝗴 𝘀𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺: ${threadInfo.messageCount}\n[🎀] ➜ 𝗣𝗵𝗶́𝗮 𝘁𝗿𝗲̂𝗻 𝗹𝗮̀ 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗰𝘂̉𝗮 𝗻𝗵𝗼́𝗺 𝗯𝗮̣𝗻 𝗱𝘂̀𝗻𝗴 ${global.config.PREFIX}𝗯𝗼𝘅 𝗶𝗻𝗳𝗼 đ𝗲̂̉ 𝘅𝗲𝗺 𝗰𝗵𝗶 𝘁𝗶𝗲̂́𝘁 `
					return api.sendMessage({
						body: msg, attachment: [
							await streamURL(threadInfo.imageSrc),
							await streamURL(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)
						]
					}, threadID, (err, info) => {
						global.client.handleReaction.push({
							name: this.config.name,
							messageID: info.messageID,
							author: event.senderID,
						})
					}, event.messageID);
				}
			}
		}
		case "2": {
			var callback = () => api.sendMessage(

				{
					body: "[⚜️]=== 『 INFORMATION ADMIN 』 ===[⚜️]"
						+ "\n◆━━━━━━━━━━━━━━━━◆"
						+ "\n[👀] ➜ Tên: Nguyễn Hải Đăng"
						+ "\n[💮] ➜ Biệt danh: JRT "
						+ "\n[❎] ➜ Ngày tháng năm sinh: 26/02/2003 "
						+ "\n[👤] ➜ Giới tính: Nam"
						+ "\n[💫] ➜ Chiều cao cân nặng: 1m75 x 68 kg"
						+ "\n[❤️] ➜ Tên duyên phận: Nguyễn Hồng Phấn"
						+ "\n[🧸] ➜ Biệt danh: Tracy"
						+ "\n[💥] ➜ Ngày sinh: 07/12/2001"
						+ "\n[💘] ➜ Mối quan hệ: Đã đính hôn"
						+ "\n[🌎] ➜ Quê quán: Phú Thọ - Hà Nội"
						+ "\n[🌸] ➜ Tính cách: Hòa đồng, năng nổ, dứt khoát, thân thiện và hài hước"
						+ "\n[🌀] ➜ Sở thích: Thích cái đẹp, đi phượt, giao lưu ca hát, thưởng thức các món ẩm thực khác nhau"
						+ "\n[⚜️]=== 『 CONTACT 』 ===[⚜️]"
						+ "\n◆━━━━━━━━━━━━━━━━◆"
						+ "\n[👉] ➜ Information: https://bio.link/nhdjrt262"
						+ "\n[☎] ➜ SĐT & Zalo: 0396049649"
						+ "\n[🌐] ➜ Facebook: https://www.facebook.com/NHD.JRT.262"
						+ "\n[⛱] ➜ TikTok: https://www.tiktok.com/@hd.jrt03"
						+ "\n[⛲] ➜ Instagram: https://www.instagram.com/hd.jrt.2k3"
						+ "\n[🔎] ➜ Twitter: https://twitter.com/JRTOfficial_03"
						+ "\n[📋] ➜ Telegram: https://t.me/nhdjrt262"
						+ "\n[🎬] ➜ Youtube: https://www.youtube.com/channel/UCNK_WugSVHOSAIPKr2epEOQ"
						+ "\n[✉️] ➜ Email: dangz123456789z@gmail.com || lehonguyen2k3@gmail.com"
						+ "\n[⚜️]=== 『 CONTACT 』 ===[⚜️]"
						+ "\n◆━━━━━━━━━━━━━━━━◆"
						+ "\n[💵] ➜ MOMO: 0354838459 / https://i.imgur.com/Ed0rDrO.png / Nguyễn Hồng Phấn"
						+ "\n[💵] ➜ MOMO: 0396049649 / https://i.imgur.com/Hxbs1q0.png / Nguyễn Hải Đăng"
						+ "\n[💵] ➜ MBBANK: 0396049649 / https://imgur.com/NXX9Lnh / Nguyễn Hải Đăng"
						+ "\n[💵] ➜ MBBANK: 0396049649 / https://i.imgur.com/2yj1jqY.png / Nguyễn Hồng Phấn"
						+ "\n[💵] ➜ TIMO BANK: 9021288475332 / https://i.imgur.com/vTx2DQp.jpg / Nguyễn Hải Đăng"
						+ "\n[💵] ➜ ZALO PAY: 0396049649 / https://imgur.com/LBeXzsy / Nguyễn Hải Đăng"
						+ "\n[💵] ➜ AGRIBANK: 4810205345666 / https://i.imgur.com/DObUFKB.png / Nguyễn Hồng Phấn"
						+ "\n[⚜️]=== 『 PROBLEM 』 ===[⚜️]"
						+ "\n◆━━━━━━━━━━━━━━━━◆"
						+ "\n[❗] ➜ Mọi thắc mắc hay bot không hoạt động có thể hỏi trực tiếp admin theo các link ở trên."
						+ "\n[📌] ➜ Hãy đồng hành cùng BOT JRT và mình nhé. Cảm ơn mọi người <3"
						+ "\n✎﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏"
						+ "\n[📝]➜ Bot được điều hành bởi JRT",

					attachment: fs.createReadStream(__dirname + "/cache/1.png")
				}, event.threadID, () =>

				fs.unlinkSync(__dirname + "/cache/1.png"));

			return request(

				encodeURI(`https://graph.facebook.com/${100033478361032}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(

					fs.createWriteStream(__dirname + '/cache/1.png')).on('close', () => callback());
		}
		case "3": {
			var { userInfo, adminIDs } = await api.getThreadInfo(event.threadID);
			var success = 0, fail = 0;
			var arr = [];
			for (const e of userInfo) {
				if (e.gender == undefined) {
					arr.push(e.id);
				}
			};

			adminIDs = adminIDs.map(e => e.id).some(e => e == api.getCurrentUserID());
			if (arr.length == 0) {
				return api.sendMessage("[🐧] ➜ Trong nhóm bạn không tồn tại 'Người dùng Facebook'.", event.threadID);
			}
			else {
				api.sendMessage("[🐧] ➜ Nhóm bạn hiện có " + arr.length + " 'Người dùng Facebook'.", event.threadID, function () {
					if (!adminIDs) {
						api.sendMessage("[🐧] ➜ Nhưng bot không phải là quản trị viên nên không thể lọc được.", event.threadID);
					} else {
						api.sendMessage("[🐧] ➜ Bắt đầu lọc..", event.threadID, async function () {
							for (const e of arr) {
								try {
									await new Promise(resolve => setTimeout(resolve, 1000));
									await api.removeUserFromGroup(parseInt(e), event.threadID);
									success++;
								}
								catch {
									fail++;
								}
							}

							api.sendMessage("[🐧] ➜ Đã lọc thành công " + success + " người.", event.threadID, function () {
								if (fail != 0) return api.sendMessage("[🐧] ➜ Lọc thất bại " + fail + " người.", event.threadID);
							});
						})
					}
				})
			}
		}
		case "4": {
			const moment = require("moment-timezone");
			var gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
			var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
			if (thu == 'Sunday') thu = 'Chủ Nhật'
			if (thu == 'Monday') thu = 'Thứ Hai'
			if (thu == 'Tuesday') thu = 'Thứ Ba'
			if (thu == 'Wednesday') thu = 'Thứ Tư'
			if (thu == "Thursday") thu = 'Thứ Năm'
			if (thu == 'Friday') thu = 'Thứ Sáu'
			if (thu == 'Saturday') thu = 'Thứ Bảy'
			const admin = config.ADMINBOT
			const ndh = config.NDH
			const namebot = config.BOTNAME
			const { commands } = global.client;
			const axios = require('axios');
			api.unsendMessage(handleReply.messageID);
			return api.sendMessage({
				body: `==== [ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ] ====`
					+ `\n━━━━━━━━━━━`
					+ `\n[🖥] ➜ 𝗠𝗼𝗱𝘂𝗹𝗲𝘀: 𝗖𝗼́ ${commands.size} 𝗹𝗲̣̂𝗻𝗵 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝘁𝗿𝗲̂𝗻 𝗯𝗼𝘁`
					+ `\n[📎] ➜ 𝗣𝗿𝗲𝗳𝗶𝘅: 𝗗𝗮̂́𝘂 𝗹𝗲̣̂𝗻𝗵 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴 𝘁𝗿𝗲̂𝗻 𝗯𝗼𝘁 𝗹𝗮̀ [ ${global.config.PREFIX} ]`
					+ `\n[💓] ➜ 𝗡𝗮𝗺𝗲 𝗯𝗼𝘁: ${namebot}`
					+ `\n[💬] ➜ 𝗟𝗶𝘀𝘁𝗯𝗼𝘅: 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗼̛̉ ${global.data.allThreadID.length} 𝗯𝗼𝘅`
					+ `\n[👑] ➜ 𝗛𝗶𝗲̣̂𝗻 𝘁𝗮̣𝗶 𝗯𝗼𝘁 đ𝗮𝗻𝗴 𝗰𝗼́ ${admin.length} 𝗮𝗱𝗺𝗶𝗻 𝘃𝗮̀  ${ndh.length} 𝗻𝗱𝗵`
					+ `\n━━━━━━━━━━━`
					+ `\n===「${thu} || ${gio}」===`,
				attachment: (await global.nodemodule["axios"]({
					url: (await global.nodemodule["axios"]('https://docs-api.jrtxtracy.repl.co/images/siesta?apikey=JRTvip_2200708248')).data.data,
					method: "GET",
					responseType: "stream"
				})).data
			}, event.threadID, event.messageID)
		}
		case "5": {
			module.exports.handleEvent = async function ({ api, event, Threads, Users }) {
				const axios = require("axios")
				var { threadID, messageID, body } = event;
				async function streamURL(url, mime = 'jpg') {
					const dest = `${__dirname}/cache/${Date.now()}.${mime}`,
						downloader = require('image-downloader'),
						fse = require('fs-extra');
					await downloader.image({
						url, dest
					});
					setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
					return fse.createReadStream(dest);
				};
				const moment = require("moment-timezone");
				var tpk = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || D/MM/YYYY");
				const name = await Users.getNameUser(event.senderID)
				const res = await axios.get(`https://golike.com.vn/func-api.php?user=${event.senderID}`);
				if (res.status == 200) {
					const finduid = res.data.data.uid
					const finddate = res.data.data.date
					api.sendMessage({
						body: `🌐==== [ 𝗨𝗜𝗗 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 ] ====🌐`
							+ `━━━━━━━━━━━━━━━━`
							+ `[🍄] ➜ 𝗧𝗲̂𝗻: ${name}`
							+ `[📌] ➜ 𝗜𝗗 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${finduid}\n[📆] ➜ 𝗡𝗴𝗮̀𝘆 𝘁𝗮̣𝗼: ${finddate}\n\n👉🏻 𝗧𝗵𝗮̉ 𝗰𝗮̉𝗺 𝘅𝘂́𝗰 "🤣" 𝘃𝗮̀𝗼 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻 𝗻𝗮̀𝘆 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗯𝗼𝘁 𝘁𝗮́𝗰𝗵 𝗿𝗮 𝗰𝗵𝘂̛̀𝗮 𝗺𝗼̂̃𝗶 𝘂𝗶𝗱`,
						attachment: await streamURL(`https://graph.facebook.com/${event.senderID}/picture?height=720&width=720&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)
					}, event.threadID, (err, info) => {
						global.client.handleReaction.push({
							name: this.config.name,
							messageID: info.messageID,
							author: event.senderID,
						})
					}, event.messageID);
				}
			}
			break;
		}
		default:
			const choose = parseInt(event.body);
			if (isNaN(event.body))
				return api.sendMessage("[🐧] ➜ 𝐕𝐮𝐢 𝐥𝐨̀𝐧𝐠 𝐧𝐡𝐚̣̂𝐩 𝟏 𝐜𝐨𝐧 𝐬𝐨̂́", event.threadID, event.messageID);
			if (choose > 5 || choose < 1)
				return api.sendMessage("[🐧] ➜ 𝐋𝐮̛̣𝐚 𝐜𝐡𝐨̣𝐧 𝐤𝐡𝐨̂𝐧𝐠 𝐧𝐚̆̀𝐦 𝐭𝐫𝐨𝐧𝐠 𝐝𝐚𝐧𝐡 𝐬𝐚́𝐜𝐡.", event.threadID, event.messageID);
	}
}