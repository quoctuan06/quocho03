module.exports.config = {
    name: "imgur",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "JRT",
    description: "Lấy link imgur",
    commandCategory: "Công cụ",
    usages: "imgur reply ảnh",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.run = async ({ api, event, args }) => {
    const axios = global.nodemodule['axios'];
    const linkanh = event.messageReply.attachments[0].url || args.join(" ");
    if (!linkanh)
        return api.sendMessage('[🐧]➜ Vui lòng phản hồi hoặc nhập link hình ảnh', event.threadID, event.messageID);
    try {
      var tpk = `",`;
        const allPromise = (await Promise.all(event.messageReply.attachments.map(item => axios.get(`https://docs-api.jrtxtracy.repl.co/imgur?link=${encodeURIComponent(item.url)}`)))).map(item => item.data.uploaded.image);
        return api.sendMessage(`"` + allPromise.join('"\n"') + tpk, event.threadID, event.messageID);
    }
    catch (e) {
        return api.sendMessage('[🐧]➜ Đã xảy ra lỗi khi thực hiện lệnh', event.threadID, event.messageID);
    }
};
