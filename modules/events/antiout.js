0/**
* @author ProCoderMew
* @warn Do not edit code or edit credits
*/

module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "1.0.7",
    credits: "ProCoderMew",
    description: "Listen events",
    dependencies: {
        "path": ""
    }
};

module.exports.run = async function ({ api, event, Users }) {
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'cache', 'meewmeew.json');
    const { antiout } = require(path);
    const { logMessageData, author, threadID } = event;
    const id = logMessageData.leftParticipantFbId;
  const moment = require("moment-timezone");
     var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
  var fullYear = global.client.getTime("fullYear");
    if (author == id && id != api.getCurrentUserID()) {
        const name = await Users.getNameUser(id) || "Người dùng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage({body:`[ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] ➜ 𝗞𝗶́𝗰𝗵 𝗵𝗼𝗮̣𝘁 𝗰𝗵𝗲̂́ đ𝗼̣̂ 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗼𝗮́𝘁 𝗻𝗵𝗼́𝗺
━━━━━━━━━━━━━━━━━━            [✔️] ➜ 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: Thành công                                                                 [👤] ➜ 𝗧𝗲̂𝗻:${name}\                                           [⏰] ➜ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${timeNow} - ${fullYear}  ━━━━━━━━━━━━━━━━━━
→ 𝗟𝘂̛𝘂 𝘆́: 𝗞𝗶́𝗰𝗵 𝗵𝗼𝗮̣𝘁 𝗰𝗵𝗲̂́ đ𝗼̣̂ 𝗰𝗮̂́𝗺 𝘁𝗵𝗼𝗮́𝘁 𝗻𝗵𝗼́𝗺 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗵𝗲̂𝗺 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗸𝗵𝗶 𝘁𝗵𝗼𝗮́𝘁 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺. 𝗡𝗲̂́𝘂 𝗻𝗵𝘂̛ 𝘁𝗿𝗼𝗻𝗴 𝗾𝘂𝗮́ 𝘁𝗿𝗶̀𝗻𝗵 𝘁𝗵𝗲̂𝗺 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗱𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝗰𝗵𝗮̣̆𝗻 𝗯𝗼𝘁, 𝗻𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝘂́𝘁 𝘁𝗵𝗲̂𝗺 𝘁𝗵𝗶̀ 𝗯𝗼𝘁 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗲̂𝗺 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺!!!`,attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/girl?apikey=JRTvip_2200708248`)).data.url, {
                    responseType: 'stream'
                })).data},
  event.threadID, event.messageID);

            }
            catch (e) {
                return api.sendMessage({body:`[ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] ➜ 𝗞𝗶́𝗰𝗵 𝗵𝗼𝗮̣𝘁 𝗰𝗵𝗲̂́ đ𝗼̣̂ 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗼𝗮́𝘁 𝗻𝗵𝗼́𝗺
━━━━━━━━━━━━━━━━━━            [❌] ➜ 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: Thất bại                                                                   [👤] ➜ 𝗧𝗲̂𝗻:${name}\                                           [⏰] ➜ 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${timeNow} - ${fullYear}  ━━━━━━━━━━━━━━━━━━
→ 𝗟𝘂̛𝘂 𝘆́: 𝗞𝗶́𝗰𝗵 𝗵𝗼𝗮̣𝘁 𝗰𝗵𝗲̂́ đ𝗼̣̂ 𝗰𝗮̂́𝗺 𝘁𝗵𝗼𝗮́𝘁 𝗻𝗵𝗼́𝗺 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗵𝗲̂𝗺 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 𝗸𝗵𝗶 𝘁𝗵𝗼𝗮́𝘁 𝗸𝗵𝗼̉𝗶 𝗻𝗵𝗼́𝗺. 𝗡𝗲̂́𝘂 𝗻𝗵𝘂̛ 𝘁𝗿𝗼𝗻𝗴 𝗾𝘂𝗮́ 𝘁𝗿𝗶̀𝗻𝗵 𝘁𝗵𝗲̂𝗺 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗮̀𝗻𝗵 𝗰𝗼̂𝗻𝗴 𝗱𝗼 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 đ𝗮̃ 𝗰𝗵𝗮̣̆𝗻 𝗯𝗼𝘁, 𝗻𝗲̂𝗻 𝗸𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝘂́𝘁 𝘁𝗵𝗲̂𝗺 𝘁𝗵𝗶̀ 𝗯𝗼𝘁 𝗸𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗲̂𝗺 𝘃𝗮̀𝗼 𝗻𝗵𝗼́𝗺!!!`,attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/girl?apikey=JRTvip_2200708248`)).data.url, {
                    responseType: 'stream'
                })).data},
  event.threadID, event.messageID); 
            }
        }
    }
    return;
}