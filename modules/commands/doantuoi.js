module.exports.config = {
    name: "doantuoi",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Đoán tuổi bằng cách reply 1 ảnh",
    commandCategory: "Công cụ",
    usages: "[reply]",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
const axios = global.nodemodule['axios'];  
const fs = global.nodemodule["fs-extra"];
    if (event.type !== "message_reply") return api.sendMessage("[🐧]➜ Bạn phải reply ảnh nào đó để đoán tuổi", event.threadID, event.messageID);
    if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) return api.sendMessage("[🐧]➜ Bạn phải reply ảnh nào đó để đoán tuổi", event.threadID, event.messageID);
    if (event.messageReply.attachments.length > 1) return api.sendMessage(`[🐧]➜ Vui lòng chỉ reply một ảnh`, event.threadID, event.messageID);
    
var options = {
  method: 'POST',
  url: 'https://microsoft-face1.p.rapidapi.com/detect',
  params: {
    returnFaceAttributes: 'age',
    detectionModel: 'detection_01',
    recognitionModel: 'recognition_01',
    returnFaceId: 'true'
  },
  headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': 'microsoft-face1.p.rapidapi.com',
    'x-rapidapi-key': 'a012e05802msh4ce48bff26d5c0ap151d85jsn4edde7f89de0'
  },
  data: {
    url: `${event.messageReply.attachments[0].url}`
  }
};

axios.request(options).then(function (response) {
    const data = response.data[0]
    const age = data.faceAttributes.age
    return api.sendMessage(`[🐧]➜ Bot đoán bạn khoảng ${age} tuổi🌸`, event.threadID, event.messageID);
}).catch(function (error) {
    return api.sendMessage(`[🐧]➜ Không thể xử lí yêu cầu của bạn🌸`, event.threadID, event.messageID);
});
}