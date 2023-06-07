const { writeFileSync, existsSync, createReadStream } = require('fs-extra');
const axios = require('axios');

module.exports.config = {
    name: "uptime",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "D-Jukie",
    description: "Uptime canvas",
    commandCategory: "Thông tin",
    usages: "uptime",
    cooldowns: 0,
};
module.exports.onLoad = async function () {
    if(!existsSync(__dirname + '/cache/VNI-HelveB.ttf')) { 
        const checkFont = (await axios.get(`https://drive.google.com/u/0/uc?id=1ImIJw9FUwfb4iKmqkexlSZ7WUJR6g8sz&export=download`, { responseType: "arraybuffer" })).data;
        writeFileSync(__dirname + '/cache/VNI-HelveB.ttf', Buffer.from(checkFont, "utf-8"));
    };
}
module.exports.run = async function ({ api, event, args }) {
    const { senderID, threadID, messageID } = event;
    return api.sendMessage({ body: `[🐧]=== 『 𝑼𝑷𝑻𝑰𝑴𝑬 𝑹𝑶𝑩𝑶𝑻 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[❤️] 𝑩𝑶𝑻 CatEmpress [❤️]\n[😶‍🌫️]➜ Time: ${(await this.uptime()).time}\n[📝]➜ Version: ${global.config.version}`, attachment: createReadStream((await this.uptime()).pathUptime) }, threadID, messageID)
}
module.exports.uptime = async() =>{
    const { loadImage, createCanvas, registerFont } = require("canvas");
    const t = process.uptime() + global.config.UPTIME;
    const h = Math.floor(t / (60 * 60));
    const m = Math.floor((t % (60 * 60)) / 60);
    const s = Math.floor(t % 60);
    const pathUptime = __dirname + '/cache/uptime.png';
    const randomAnime = (await axios.get('https://docs-api.jrtxtracy.repl.co/taoanhdep/random')).data;
    
    const anime = await loadImage(randomAnime.random.imgAnime);
    const line = await loadImage('https://i.imgur.com/jsMB7Ni.png');
    const background = await loadImage('https://i.imgur.com/YecdSbV.jpg');
    const text = await loadImage('https://i.imgur.com/uIMBmnk.png');
    const avatar = await loadImage(`https://graph.facebook.com/${global.config.ADMINBOT[0]}/picture?height=720&width=720&access_token=1371688333316058|yqnZCV_SATCp9jPHNUQZaj5_C_Y`);

    registerFont(__dirname + '/cache/VNI-HelveB.ttf', { family: "VNI-HelveB" });
    var canvas = createCanvas(1280, 720);
    var ctx = canvas.getContext("2d");
        ctx.fillStyle = randomAnime.random.colorBg || "#4ea123"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.5;
        ctx.drawImage(background, 0, 0, 1280, 720);
        ctx.globalAlpha = 1;
        ctx.drawImage(anime, 540, -30, 700, 700);
        ctx.drawImage(line, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(text, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(avatar, 69, 67, 105, 105);
        ctx.font = "100 35px VNI-HelveB";
        ctx.fillStyle = "#fff";
        ctx.textAlign = "start";
        ctx.fillText('Hồ Quốc Tuấn', 274, 453);
        ctx.fillText(((h < 10) ? '0' + h : h) + ':' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s), 274, 514);
        ctx.fillText(global.config.version, 274, 578);
    const imageBuffer = canvas.toBuffer();
        writeFileSync(pathUptime, imageBuffer);
    return {
        pathUptime,
        time: ((h < 10) ? '0' + h : h) + ':' + ((m < 10) ? '0' + m : m) + ':' + ((s < 10) ? '0' + s : s)
    }
}