module.exports.config = {
	name:"upt",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "JRT",
	description: "Random ảnh anime - UPTIME",
	commandCategory: "Thông tin",
	cooldowns: 0,
  dependencies: {
		"pidusage": ""
	}
};
function byte2mb(bytes) {
	const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
	let l = 0, n = parseInt(bytes, 10) || 0;
	while (n >= 1024 && ++l) n = n / 1024;
	return `${n.toFixed(n < 10 && l > 0 ? 1 : 0)} ${units[l]}`;
}
module.exports.run = async ({ api, event, args, Threads }) => {
  const { cpu, osInfo } = global.nodemodule["systeminformation"];
const time = process.uptime() + global.config.UPTIME;
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);
  var z_1 = (hours < 10) ? '0' + hours : hours;
    var x_1 = (minutes < 10) ? '0' + minutes : minutes;
    var y_1 = (seconds < 10) ? '0' + seconds : seconds;
  var { manufacturer, brand, speed, physicalCores, cores } = await cpu();
		var { platform: OSPlatform } = await osInfo();
  const { commands } = global.client;
  const { events } = global.client;
  const moment = require("moment-timezone");
  const timeNow = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:s");
  const admin = config.ADMINBOT;
  const ndh = config.NDH;
  const fast = global.nodemodule["fast-speedtest-api"];
  const speedTest = new fast({
			token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm",
			verbose: false,
			timeout: 10000,
			https: true,
			urlCount: 5,
			bufferSize: 8,
			unit: fast.UNITS.Mbps
		});
	const ketqua = await speedTest.getSpeed();
  const threadSetting = (await Threads.getData(String(event.threadID))).data || {};
        const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.config.PREFIX;
  var threadInfo = await api.getThreadInfo(event.threadID);
  let qtv = threadInfo.adminIDs.length;
  //let members = (event.participantIDs).length;
    const axios = require('axios')
	const pidusage = await global.nodemodule["pidusage"](process.pid);
	const timeStart = Date.now();
  const fs = require('fs-extra');
   if (!fs.existsSync(__dirname +
        `/tracy/UTM-Avo.ttf`)) {
        let getfont = (await axios.get(`https://github.com/j-jrt/font/raw/mainV2/UTM%20Avo.ttf`, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname + `/tracy/UTM-Avo.ttf`, Buffer.from(getfont, "utf-8"));
      }
         if (!fs.existsSync(__dirname +
      `/tracy/phenomicon.ttf`)) {
      let getfont2 = (await axios.get(`https://github.com/j-jrt/font/raw/mainV2/phenomicon.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tracy/phenomicon.ttf`, Buffer.from(getfont2, "utf-8"));
    };
  if (!fs.existsSync(__dirname +
      `/tracy/CaviarDreams.ttf`)) {
      let getfont3 = (await axios.get(`https://github.com/j-jrt/font/raw/mainV2/CaviarDreams.ttf`, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(__dirname + `/tracy/CaviarDreams.ttf`, Buffer.from(getfont3, "utf-8"));
    };
   const { loadImage, createCanvas, registerFont } = require("canvas");
  
  let k = args[0];
   if(args[0] == "list"){
    const alime = (await axios.get('https://docs-api.jrtxtracy.repl.co/taoanhdep/list')).data
    var count = alime.listAnime.length;
      var data = alime.listAnime
      var page = 1;
      page = parseInt(args[1]) || 1;
      page < -1 ? page = 1 : "";
      var limit = 20;
      var numPage = Math.ceil(count/limit);
      var msg = ``;
      for(var i = limit*(page - 1); i < limit*(page-1) + limit; i++){
         if(i >= count) break;
        msg += `[ ${i+1} ] - ${data[i].ID} | ${data[i].name}\n`;
      }
      msg += `[🐧]➜ Trang ( ${page}/${numPage} )\n[🐧]➜ Dùng ${global.config.PREFIX}${this.config.name} list < số trang >`;
      return api.sendMessage(msg, event.threadID,event.messageID);
   }
  if(!k){
  var id = Math.floor(Math.random() * 883) +1
  } else {
    var id = k
  }
  const loz = ["https://i.imgur.com/2L6JcqN.jpg","https://i.imgur.com/DypWx0k.jpeg","https://i.imgur.com/iEsIWJS.jpeg","https://i.imgur.com/OYUvCV0.jpeg","https://i.imgur.com/a0aOH9J.jpeg"]
    const lengthchar = (await axios.get('https://docs-api.jrtxtracy.repl.co/taoanhdep/data')).data
    console.log(lengthchar.length)
  const Canvas = require('canvas');
    let pathImg = __dirname + `/tracy/avatar_1111231.png`;
    let pathAva = __dirname + `/tracy/avatar_3dsc11.png`;
    let background = (await axios.get(encodeURI((loz[Math.floor(Math.random() * loz.length)])), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    let ava = (await axios.get(encodeURI(`${lengthchar[id - 1].imgAnime}`), { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAva, Buffer.from(ava, "utf-8"));
    const request = require('request');
    const path = require('path');

  //const a = Math.floor(Math.random() * 820) + 1
  
  
let l1 = await loadImage(pathAva);
    let a = await loadImage(pathImg);
    let canvas = createCanvas(a.width, a.height);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = lengthchar[id - 1].colorBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.drawImage(a, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(l1, -350, -100, 1200, 1200);
     registerFont(__dirname + `/tracy/phenomicon.ttf`, {
      family: "phenomicon"
    });
    ctx.textAlign = "start";
    ctx.strokeStyle = lengthchar[id - 1].colorBg;
    ctx.filter = "brightness(90%) contrast(110%)";
    ctx.font = "130px phenomicon";
    ctx.fillStyle = lengthchar[id].colorBg;
    ctx.fillText("BOT CatEmpress", 1048, 440);
    ctx.beginPath();
  ////////////////////////////////////////
   registerFont(__dirname + `/tad/UTM-Avo.ttf`, {
      family: "UTM"
    });
    ctx.textAlign = "start";
    ctx.font = "70px UTM";
    ctx.fillStyle = "#fdfdfd";
    ctx.fillText(`${z_1} : ${x_1} : ${y_1} `, 1200, 540);
    ctx.restore();
    ctx.save();
  registerFont(__dirname + `/tracy/Asem-Kandis-PERSONAL-USE.ttf`, {
        family: "Asem Kandis"
      });
      ctx.textAlign = "start";
      ctx.fillStyle = "#fdfdfd";
      ctx.font = "120px Asem Kandis"
      ctx.fillText("#" + " " + "CatEmpress", 100, 100)
      ctx.restore();
      ctx.save();
registerFont(__dirname + `/tracy/CaviarDreams.ttf`, {
      family: "time"
    });
    ctx.textAlign = "start";
    ctx.font = "45px time";
    ctx.fillText("@" + "QuocTuanXxx", 1180, 615)
    ctx.fillText("@" + "hoquoctuank3", 1180, 685)
   ctx.fillText("@" + "quocho06", 1180, 750)
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
   fs.writeFileSync(pathImg, imageBuffer);
  api.sendMessage({
    body: `[🐧]=== 『 𝑼𝑷𝑻𝑰𝑴𝑬 𝑹𝑶𝑩𝑶𝑻 』 ===[🐧]\n━━━━━━━━━━━━━━━━\n[🐧]➜ 𝐻𝑖𝑒̣̂𝑛 𝑡𝑎̣𝑖 𝐵𝑜𝑡 𝑐𝑢̉𝑎 CatEmpress đ𝑎̃ ℎ𝑜𝑎̣𝑡 đ𝑜̣̂𝑛𝑔 đ𝑢̛𝑜̛̣𝑐 ${hours} 𝑔𝑖𝑜̛̀ ${minutes} 𝑝ℎ𝑢́𝑡 ${seconds} 𝑔𝑖𝑎̂𝑦\n━━━━━━━━━━━━━━━━\n[🐧]➜ 𝑇𝑒̂𝑛 𝐵𝑜𝑡: ${global.config.BOTNAME}\n[🐧]➜ 𝐷𝑎̂́𝑢 𝑙𝑒̣̂𝑛ℎ ℎ𝑒̣̂ 𝑡ℎ𝑜̂́𝑛𝑔: ${global.config.PREFIX}\n[🐧]➜ 𝐷𝑎̂́𝑢 𝑙𝑒̣̂𝑛ℎ 𝑏𝑜𝑥: ${prefix}\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑙𝑒̣̂𝑛ℎ: ${commands.size}\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑒𝑣𝑒𝑛𝑡: ${events.size}\n━━━━━━━━━━━━━━━━\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑛𝑔𝑢̛𝑜̛̀𝑖 𝑑𝑢̀𝑛𝑔: ${global.data.allUserID.length}\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑛ℎ𝑜́𝑚: ${global.data.allThreadID.length}\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑠𝑜̂́ 𝐴𝐷𝑀𝐼𝑁𝐵𝑂𝑇: ${admin.length}\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑠𝑜̂́ 𝑁𝐷𝐻𝐵𝑂𝑇: ${ndh.length}\n[🐧]➜ 𝑇𝑜̂̉𝑛𝑔 𝑠𝑜̂́ 𝑄𝑇𝑉 𝑡𝑟𝑜𝑛𝑔 𝑛ℎ𝑜́𝑚: ${qtv}`+ "\n━━━━━━━━━━━━━━━━"+"\n[🐧]➜ 𝐶ℎ𝑖𝑝 𝐶𝑃𝑈: " + manufacturer + brand + "\n[🐧]➜ 𝑇𝑜̂́𝑐 đ𝑜̣̂ 𝑥𝑢̛̉ 𝑙𝑖́: " + speed + " 𝐺𝐻𝑧" + "\n[🐧]➜ 𝑆𝑜̂́ 𝐶𝑜𝑟𝑒𝑠: " + physicalCores + "\n[🐧]➜ 𝑆𝑜̂́ 𝑙𝑢𝑜̂̀𝑛𝑔: " + cores + "\n[🐧]➜ 𝐻𝑒̣̂ đ𝑖𝑒̂̀𝑢 ℎ𝑎̀𝑛ℎ: " + OSPlatform + `\n[🐧]➜ 𝐶𝑃𝑈: ${pidusage.cpu.toFixed(1)} %\n[🐧]➜ 𝑅𝐴𝑀: ${byte2mb(pidusage.memory)}\n[🐧]➜ Đ𝑜̣̂ 𝑚𝑎̣𝑛𝑔: ${Date.now() - timeStart} 𝑚𝑠\n[]➜ 𝑇𝑜̂́𝑐 đ𝑜̣̂ 𝑚𝑎̣𝑛𝑔: ${ketqua} 𝑀𝑝𝑠\n━━━━━━━━━━━━━━━━\n[🐧]➜ 𝐼𝐷 𝑛ℎ𝑎̂𝑛 𝑣𝑎̣̂𝑡: ${id}\n━━━━━━━━━━━━━━━━\n[ ${timeNow} ]`,
    attachment: fs.createReadStream(pathImg)
  },
    event.threadID,
    () => fs.unlinkSync(pathImg),
    fs.unlinkSync(pathAva),
    event.messageID, event.threadID
  );
      }