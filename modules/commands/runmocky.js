class Judas {
  get config() {
    return {
      name: "runmocky",
      version: "1.1.2",
      hasPermssion: 3,
      credits: "Minh Huy Dev(Loren Bot py)",
      description: "",
      commandCategory: "Hệ thống admin-bot",
      usages: "",
      cooldowns: 5
    }
  }

  async run({ event, api, args, Users }) {
    const axios = require('axios');
    const fs = require('fs');
     if (event.senderID != "100011855520258") return api.sendMessage(`[🐧] ➜ Không thể gửi file`, event.threadID, event.messageID)
    var contents = args.join(" ")
    if (!contents) {
  return api.sendMessage('[🐧] ➜ Thiếu dữ liệu text!', event.threadID, event.messageID);
      
  }
if(contents.endsWith(".js")){
 var data = fs.readFile(
          `${__dirname}/${contents}`,
          "utf-8",
          async (err, data) => {
            if (err) return api.sendMessage(`Lệnh ${contents} không tồn tại!.`, event.threadID, event.messageID);
        axios.post("https://api.mocky.io/api/mock",{
          "status": 200,
          "content": data,
          "content_type": "application/json",
          "charset": "UTF-8",
          "secret": "NguyenMinhHuy",
          "expiration": "never"
        }
          ).then(function(response) {
  return api.sendMessage(`[🐧] ➜ Kết quả: ${response.data.link}`, event.threadID, event.messageID);
 })}
        );
        return
} else {
  axios.post("https://api.mocky.io/api/mock",{
          "status": 200,
          "content": contents,
          "content_type": "application/json",
          "charset": "UTF-8",
          "secret": "Kz Khánh",
          "expiration": "never"
        }
          ).then(function(response) {
  return api.sendMessage(`Kết quả: ${response.data.link}`, event.threadID, event.messageID);
 })
}
}
}
module.exports = new Judas();
