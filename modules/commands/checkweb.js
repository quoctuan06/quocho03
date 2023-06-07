module.exports.config = {
    name: "checkweb",
    version: "1.0.0",
    credits: "CatalizCS",
    hasPermssion: 0,
    description: "Kiểm tra/báo cáo trang web bạn hoặc ai đó không an toàn!",
    commandCategory: "Công cụ",
    usages: "checkweb [arg]",
    dependencies: {
    "safe-browse-url-lookup": ""
  },
    cooldowns: 0
};

module.exports.handeEvent = async ({ event, api }) => {
    const { messageID, threadID } = event;
    let data = global.data.threadData.get(threadID) || {};
    if (data["safety-check"] = false ) return;
    else if (event.body.indexOf("http")) {
    const lookup = require("safe-browse-url-lookup")({ apiKey: "AIzaSyAyPQHnnLU2S6Fqy2x6eZIyFOQGe6Xwiek" });
    var msg = []
    lookup.checkSingle(event.body)
        .then(isMalicious => {
        isMalicious ? msg += `[🐧]=== 『 CHECKING WEB 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ Trang web ${event.body} có thể đã bị nhiễm mã độc! vui lòng cẩn thận!!\n` : msg += `[🐧]➜ Trang web ${event.body} an toàn!`;
        return api.sendMessage(msg, event.threadID, event.messageID);
        })
      .catch(err => {
      console.log('Something went wrong.');
      console.log(err);
      });
    }
    else return
}

module.exports.run = async ({ api, event, Threads, args, utils }) => {
    let data = (await Threads.getData(event.threadID)).data;
    switch (args[0]) {
        case "on": {
            data["safety-check"] = true;
            await Threads.setData(event.threadID, options = { data });
            global.data.threadData.get(event.threadID, data);
            api.sendMessage("[ SAFETY-CHECK ]➜ Đã bật chế độ tự động!", event.threadID, event.messageID);
            break;
        }
        case "off": {
            data["safety-check"] = false;
            await Threads.setData(event.threadID, options = { data });
            global.data.threadData.get(event.threadID, data);
            api.sendMessage("[ SAFETY-CHECK ]➜ Đã tắt chế độ tự động!", event.threadID, event.messageID);
            break;
        }
        default: {
          var msg = []
            const lookup = require('safe-browse-url-lookup')({ apiKey: 'AIzaSyAyPQHnnLU2S6Fqy2x6eZIyFOQGe6Xwiek' });
            lookup.checkSingle(args.join(" "))
                .then(isMalicious => {
                    isMalicious ? msg += `[🐧]=== 『 SUPPORTBOT ADD 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ Trang web ${args.join(" ")} có thể đã bị nhiễm mã độc! vui lòng cẩn thận!!\n` : msg += `[🐧]➜ Trang web ${args.join(" ")} an toàn!`;
                    return api.sendMessage(msg, event.threadID, event.messageID);
                })
                .catch(err => {
                    console.log('Something went wrong.');
                    console.log(err);
                });
            break;
          
        }
    }
}