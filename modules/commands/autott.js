/*const axios = require('axios');
module.exports.config = {
    name: 'autott',
    version: '10.02',
    hasPermssion: 2,
    credits: 'DC-Nam', // Bok idea thời tiết
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống support-bot',
    usages: '[]',
    cooldowns: 3
};
const nam = [
    {
        timer: '7:00:00 AM',
        message: ['\n{abc}']
    },
    {
        timer: '12:00:00 PM',
        message: ['\n{abc}']
    },
    {
        timer: '7:00:00 PM',
        message: ['\n{abc}']
    },
    {
        timer: '11:00:00 PM',
        message: ['\n{abc}']
    }
];
module.exports.onLoad = o => setInterval(async () => {
    var date = (new Date).toLocaleTimeString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh"
    });;
    const r = a => a[Math.floor(Math.random() * a.length)];
    if (á = nam.find(i => i.timer == date)) {
        console.log(`[ ${date} ]➜ Đã gửi tin nhắn tự động!`);
        var msg = r(á.message);
        const res = await axios.get(`https://api.popcat.xyz/weather?q=H%C3%A0%20N%E1%BB%99i`);
        var currentDay = res.data[0].current.day.replace(/Friday/g, "Thứ 6").replace(/Saturday/g, "Thứ 7").replace(/Sunday/g, "Chủ nhật").replace(/Monday/g, "Thứ 2").replace(/Tuesday/g, "Thứ 3").replace(/Wednesday/g, "Thứ 4").replace(/Thursday/g, "Thứ 5");
        var date = res.data[0].current.date;
        var dateFormat = `Ngày ${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;
        var skytext = res.data[0].current.skytext.toString()
        "Cloudy" == skytext ? skytext = "Mây" : "Sunny" == skytext ? skytext = "Nắng" : "Partly Cloudy" == skytext ? skytext = "Mây một phần" : "Mostly Cloudy" == skytext ? skytext = "Mây rất nhiều" : "Rain" == skytext ? skytext = "Mưa" : "Thunderstorm" == skytext ? skytext = "Bão" : "Snow" == skytext ? skytext = "Tuyết" : "Fog" == skytext || "Haze" == skytext ? skytext = "Sương mù" : "Clear" == skytext ? skytext = "Trời trong" : "Light Rain" == skytext ? skytext = "Mưa nhẹ" : "Mostly Clear" == skytext && (skytext = "Trời trong rất nhiều");
        var winddisplay = res.data[0].current.winddisplay.toString().split(" ")[2];
        "Northeast" == winddisplay && (winddisplay = "Hướng Đông Bắc"), "Northwest" == winddisplay && (winddisplay = "Hướng Tây Bắc"), "Southeast" == winddisplay && (winddisplay = "Hướng Đông Nam"), "Southwest" == winddisplay && (winddisplay = "Hướng Tây Nam"), "East" == winddisplay && (winddisplay = "Hướng Đông"), "West" == winddisplay && (winddisplay = "Hướng Tây"), "North" == winddisplay && (winddisplay = "Hướng Bắc"), "South" == winddisplay && (winddisplay = "Hướng Nam");
        var abc = `=== THỜI TIẾT HÔM NAY ===\n━━━━━━━━━━━━\n[⚜️]➜ Thời tiết tại: ${res.data[0].location.name}.\n[⚜️]➜ Thời gian: ${currentDay}/${dateFormat}.\n[⚜️]➜ Nhiệt độ: ${res.data[0].current.temperature}°${res.data[0].location.degreetype}.\n[⚜️]➜ Mô tả: ${skytext}.\n[⚜️]➜ Độ ẩm: ${res.data[0].current.humidity}%.\n[⚜️]➜ Hướng gió: ${res.data[0].current.windspeed} ${winddisplay}.\n[⚜️]➜ Ghi nhận vào lúc: ${res.data[0].current.observationtime}.\n[⚜️]➜ Từ trạm vũ trụ của 𝐉𝐑𝐓 𝐱 𝐓𝐫𝐚𝐜𝐲.\n[⚜️]➜ Bot 𝐉𝐑𝐓 𝐱 𝐓𝐫𝐚𝐜𝐲, phóng viên từ đài truyền hình VTV Việt Nam đưa tin tại Trái Đất.`;
        msg = msg.replace(/{abc}/, abc);
        msg = {
                body: msg, attachment: (await axios.get((await axios.get(`https://docs-api.catteam123.repl.co/images/girl`)).data.data, {
                    responseType: 'stream'
                })).data
            };
   global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
    };
}, 1000);

module.exports.run = async o => {
    try {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        const request = global.nodemodule["request"];
        const { api, event, args } = o;
        const { threadID, messageID } = event;
        var bok = args.join(" ");
        if (!bok) return api.sendMessage("[⚜️]➜ Nhập tỉnh/tp cần xem thời tiết", threadID);
        const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(bok)}`);
        const bokk = res.data[0].forecast;
        var text = `[⚜️]➜ Thời tiết của: ${bok} vào các ngày`;
        for (let i = 0; i < 5; i++) {
            text += `\n${i + 1}. ${bokk[i].day} ${bokk[i].date}\n[⚜️]➜ Nhiệt độ dự báo: từ ${bokk[i].low} đến ${bokk[i].high}\n[⚜️]➜ Mô tả: ${bokk[i].skytextday}\n[⚜️]➜ Tỷ lệ mưa: ${bokk[i].precip}\n`
        };
        api.sendMessage(text, threadID, messageID)
    } catch (err) { api.sendMessage(`${err}`, threadID) }
}*/
module.exports.config = {
    name: 'autott',
    version: '10.02',
    hasPermssion: 2,
    credits: 'DC-Nam', // Bok idea thời tiết
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống support-bot',
    usages: 'autott',
    cooldowns: 3
};
const nam = [{

    timer: '6:00:00 AM',
    message: ['\n{abc}']
},
    {
      timer: '12:00:00 PM',
    message: ['\n{abc}']
},
             {
    timer: '6:00:00 PM',
    message: ['\n{abc}']
},
             {
    timer: '10:00:00 PM',
    message: ['\n{abc}']
},
             {
    timer: '0:00:00 PM',
    message: ['\n{abc}']
},
             {
    }];
module.exports.onLoad = o => setInterval(async() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())){
  const axios = require('axios');
const time = process.uptime();
		 var hours = Math.floor(time / (60 * 60));
		var minutes = Math.floor((time % (60 * 60)) / 60);
	var seconds = Math.floor(time % 60);
  var msg = r(á.message);
  const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI('Hồ Chí Minh')}`);
    var abc =`[🐧]=== 『 NOTIFICATION WEATHER 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ 𝗰𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝘁𝗵𝗼̛̀𝗶 𝘁𝗶𝗲̂́𝘁 𝘁𝗮̣𝗶 ${res.data[0].location.name}\n[🐧]➜ 𝗩𝗮̀𝗼 𝗹𝘂́𝗰: ${res.data[0].current.day} ${res.data[0].current.date}\n[🐧]➜ 𝗡𝗵𝗶𝗲̣̂𝘁 đ𝗼̣̂: ${res.data[0].current.temperature}°${res.data[0].location.degreetype}\n[🐧]➜ 𝗠𝗼̂ 𝘁𝗮̉: ${res.data[0].current.skytext}\n[🐧]➜ đ𝗼̣̂ 𝗮̂̉𝗺: ${res.data[0].current.humidity}\n[🐧]➜ 𝗛𝘂̛𝗼̛́𝗻𝗴 𝗴𝗶𝗼́: ${res.data[0].current.winddisplay}\n[🐧]➜ 𝗚𝗵𝗶 𝗻𝗵𝗮̣̂𝗻 𝘃𝗮̀𝗼 𝗹𝘂́𝗰: ${res.data[0].current.observationtime} \n\n[🐧]➜ 𝐍𝐡𝐚̣̂𝐩 ${global.config.PREFIX}weather 𝐭𝐢̉𝐧𝐡/𝐭𝐡𝐚̀𝐧𝐡 𝐩𝐡𝐨̂́ đ𝐞̂̉ 𝐱𝐞𝐦 𝐭𝐡𝐨̛̀𝐢 𝐭𝐢𝐞̂́𝐭 𝐧𝐡𝐞́!!!!`;
    msg = msg.replace(/{abc}/,abc);
msg = msg.replace(/{hours}/g, hours)
  msg = msg.replace(/{minutes}/g, minutes)
  msg = msg.replace(/{seconds}/g, seconds)
    msg = msg.replace(/{time}/g, require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)")).replace(/{thinh}/g, (await axios.get(`https://docs-api.jrtxtracy.repl.co/saying/hearing?apikey=JRTvip_2200708248`)).data.data)
            msg = {
                body: msg, attachment: (await axios.get((await axios.get(`https://docs-api.jrtxtracy.repl.co/images/girl?apikey=JRTvip_2200708248`)).data.data, {
                    responseType: 'stream'
                })).data
            };
   global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
    };
}, 1000);

module.exports.run = async o => {
    try {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        const request = global.nodemodule["request"];
        const { api, event, args } = o;
        const { threadID, messageID } = event;
        var bok = args.join(" ");
        if (!bok) return api.sendMessage("[🐧]➜ Nhập tỉnh/tp cần xem thời tiết", threadID);
        const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(bok)}`);
        const bokk = res.data[0].forecast;
        var text = `[🐧]➜ Thời tiết của: ${bok} vào các ngày`;
        for (let i = 0; i < 5; i++) {
            text += `\n${i + 1}. ${bokk[i].day} ${bokk[i].date}\n[🐧]➜ Nhiệt độ dự báo: từ ${bokk[i].low} đến ${bokk[i].high}\n[🐧]➜ Mô tả: ${bokk[i].skytextday}\n[🐧]➜ Tỷ lệ mưa: ${bokk[i].precip}\n`
        };
        api.sendMessage(text, threadID, messageID)
    } catch (err) { api.sendMessage(`${err}`, threadID) }
}  