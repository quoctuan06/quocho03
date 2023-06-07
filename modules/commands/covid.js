module.exports.config = {
  name: "covid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Thiệu Trung Kiên",
  description: "Xem thông tin covid19",
  commandCategory: "Tin tức",
  usages: "[Tên quốc gia]",
  cooldowns: 5
};

module.exports.run = async (
{
  api,
  event,
  args
}) =>
{
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
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
  var tip = args.join(" ");
  if (!tip) return api.sendMessage(`[⚜️] ➜ 𝗡𝗵𝗮̣̂𝗽 𝘁𝗲̂𝗻 𝗾𝘂𝗼̂́𝗰 𝗴𝗶𝗮 🌎`, event.threadID, event.messageID);
  else
  {
    axios.get(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(tip)}`).then(res =>
    {
      let nhiem = res.data.cases,
        chet = res.data.deaths,
        dieutri = res.data.recovered,
        danso = res.data.population,
        chauluc = res.data.continent,
        quocgia = res.data.country
      var flag = res.data.countryInfo.flag;
      let callback = function ()
      {
        api.sendMessage(
        {
          body: `=== 『 STATISTICS NEWS 』 ===\n━━━━━━━━━━━━━━━━\n[🌎] ➜ 𝐐𝐮𝐨̂́𝐜 𝐆𝐢𝐚 : ${quocgia}\n\n[🦠] ➜ 𝐍𝐡𝐢𝐞̂̃𝐦: ${nhiem}\n[☠️] ➜ 𝐓𝐮̛̉ 𝐯𝐨𝐧𝐠: ${chet} \n[❤️] ➜ 𝐂𝐡𝐮̛̃𝐚 𝐭𝐫𝐢̣ : ${dieutri}\n[📝] ➜ 𝐃𝐚̂𝐧 𝐬𝐨̂́ : ${danso}\n[🔎] ➜ 𝐂𝐡𝐚̂𝐮 𝐥𝐮̣𝐜: ${chauluc}\n\n━━━━━━━━━━━━━━━\n===「${thu} || ${gio}」===`,
          attachment: fs.createReadStream(__dirname + `/cache/covidtk.png`)
        }, event.threadID, () => fs.unlinkSync(__dirname + `/cache/covidtk.png`), event.messageID);
      };
      request(encodeURI(flag)).pipe(fs.createWriteStream(__dirname + `/cache/covidtk.png`)).on("close", callback);
    })
  }
}