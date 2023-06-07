module.exports.config = {
	name: "kick",
	version: "1.0.1", 
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "Xoá người bạn cần xoá khỏi nhóm bằng cách tag",
	commandCategory: "Box", 
	usages: "[tag]", 
	cooldowns: 0,
};
module.exports.run = async function({ api, event, getText, Threads }) {
	var mention = Object.keys(event.mentions);
	try {
		let dataThread = (await Threads.getData(event.threadID)).threadInfo;
		if (!dataThread.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage("Cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!", event.threadID, event.messageID);
    if(event.type == "message_reply") { mention[0] = event.messageReply.senderID }
		if(!mention[0]) return api.sendMessage("Bạn phải tag người cần kick",event.threadID);
		if (dataThread.adminIDs.some(item => item.id == event.senderID)) {
			for (const o in mention) {
				setTimeout(() => {
					api.removeUserFromGroup(mention[o],event.threadID) 
				},3000)
			}
		}
	} catch { return api.sendMessage("Đã có lỗi xảy ra, vui lòng thử lại sau",event.threadID) }
}