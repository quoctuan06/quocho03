module.exports.config = {
	name: "uid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "Lấy ID người dùng.",
	commandCategory: "Công cụ",
	cooldowns: 0
};

module.exports.run = async function({ event, api, args, client, Currencies, Users, utils, __GLOBAL, reminder }) {
const fs = global.nodemodule["fs-extra"];
    const request = global.nodemodule["request"];
    const axios = global.nodemodule['axios']; 
    if(event.type == "message_reply") { 
      let name = await Users.getNameUser(event.messageReply.senderID) 
	uid = event.messageReply.senderID
	var callback = () =>   api.sendMessage({body:`=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ 𝐓𝐞̂𝐧 : ${name}\n[🐧]➜ 𝗜𝗗: ${uid}\n[🐧]➜ 𝗜𝗕: m.me/${uid}\n[🐧]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${uid}\n━━━━━━━━━━━━━━━━━━`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback()); 
    }
    if (!args[0]) {
      let name = await Users.getNameUser(event.senderID) 
      var uid = event.senderID;
      const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=LV7LWgAp`);
//var name = res.data.result.name 
        var callback = () =>  api.sendMessage({body:`=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ 𝐓𝐞̂𝐧 : ${name}\n[🐧]➜ 𝗜𝗗: ${event.senderID}\n[🐧]➜ 𝗜𝗕: m.me/${event.senderID}\n[🐧]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${event.senderID}\n━━━━━━━━━━━━━━━━━━`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${event.senderID}/picture?height=1500&width=1500&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback()); 
    }
    else {
	if (args[0].indexOf(".com/")!==-1) {
    const res_ID = await api.getUID(args[0]);
   var name = data.name
var data = await api.getUserInfoV2(res_ID);
    var username = data.username
    var link = data.link
    var callback = () => api.sendMessage({body:`=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ 𝗧𝗲̂𝗻: ${name}\n[🐧]➜ 𝗜𝗗: ${res_ID}\n[🐧]➜ 𝗜𝗕: m.me/${res_ID}\n[🐧]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: ${link}\n━━━━━━━━━━━━━━━━━━`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${res_ID}/picture?height=1500&width=1500&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback()); }
	else {
		if (args.join().indexOf('@') !== -1) 
      var uid = Object.keys(event.mentions)
    var name = (await Users.getData(uid)).name
      var callback = () => 
api.sendMessage({body:`=== [ 𝗨𝗜𝗗 𝗨𝗦𝗘𝗥 ] ====\n━━━━━━━━━━━━━━━━━━\n[🐧]➜ 𝐓𝐞̂𝐧 : ${name}\n[🐧]➜ 𝗜𝗗: ${uid}\n[🐧]➜ 𝗜𝗕: m.me/${uid}\n[🐧]➜ 𝗟𝗶𝗻𝗸𝗳𝗯: https://www.facebook.com/profile.php?id=${uid}\n━━━━━━━━━━━━━━━━━━`, attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID,
        () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
    return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',
        () => callback()); 
               
	}
}
}