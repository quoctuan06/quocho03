module.exports.config = {
    name: "tiktok2",
    version: "1.1.12",
    hasPermssion: 0,
    credits: "Dũngkon",
    description: "Lấy video/thông tin tiktok",
    commandCategory: "Phương tiện",
    usages: "",
    cooldowns: 5,
    dependencies: {"axios": ""}
};
const axios = global.nodemodule["axios"];
const fs = global.nodemodule["fs-extra"];
const request = global.nodemodule["request"];
const downloader = require('image-downloader')
  // khai báo trên đầu đi mấy cái dưới đỡ phải khái báo lại
module.exports.run = async function ({ event, api, args, Users, Threads }) {
try {
    const { threadID, messageID, senderID, body } = event;
    switch (!args[0] ?'':args[0].toLowerCase()) {
  case "video":
    case "v":{
       const link = args[1];
      if (!link) return api.sendMessage("[🐧]➜ Cần link video tiktok", threadID);
const res = await axios.get(`https://apidungkonuser.dungkonuwu.repl.co/tiktok?video=${link}`);
const url = res.data.data.play;
  const str = res.data.data.title;
const hastag = str.split(' ').filter(i => i.startsWith('#')).join(', ');
       var callback = () => api.sendMessage({body:`[🐧]=== 『 VIDEO TIKTOK 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Tên kênh: ${res.data.data.author.nickname}\n[🐧]➜ ID: ${res.data.data.author.unique_id}\n[🐧]➜ Lượt Tim: ${res.data.data.digg_count}\n[🐧]➜ Hastag: ${hastag}\n[🐧]➜ Lượt Bình Luận: ${res.data.data.comment_count}\n[🐧]➜ Lượt Chia Sẻ: ${res.data.data.share_count}\n[🐧]➜ Lượt Tải Xuống: ${res.data.data.download_count}`,attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp4"),event.messageID);
   return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/tkvd.mp4')).on('close',() => callback());  
    }  
      break;
  case "music":
   case "m":
   case "audio":
   case "a":{
    const link = args[1];
          if (!link) return api.sendMessage("[🐧]➜ Thiếu Link", threadID);
const res = await axios.get(`https://apidungkonuser.dungkonuwu.repl.co/tiktok?video=${link}`);
var url = res.data.data.music;
       var callback = () => api.sendMessage({body:`[🐧]=== 『 MUSIC TIKTOK 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Nhạc dùng từ:\n[🐧]➜ ID: ${res.data.data.music_info.id}=>${res.data.data.music_info.author}\n=>${res.data.data.music_info.title}`,attachment: fs.createReadStream(__dirname + "/cache/tkvd.mp3")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkvd.mp3"),event.messageID);
   return request(encodeURI(`${url}`)).pipe(fs.createWriteStream(__dirname+'/cache/tkvd.mp3')).on('close',() => callback());  
    }
      break;
    
    case "info":
    case "i":{
      const username = args[1];
      if (!username) return api.sendMessage("[🐧]➜ Thiếu ID/USER TikTok", threadID);
       const res = await axios.get(`https://sumiproject.space/tiktok?info=${username}`);
      var url1 = res.data.data.user.avatarLarger;
  var callback = () => api.sendMessage({body:`[🐧]=== 『 INFO USER TIKTOK 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Name: ${res.data.data.user.nickname}\n[🔗]➜ Id: ${res.data.data.user.id}\n[📝]➜ Tiểu sử: ${res.data.data.user.signature}\n[🔒]➜ Tài khoản riêng tư: ${res.data.data.user.privateAccount}\n[❤️]➜ Follow: ${res.data.data.stats.followerCount}\n[🔎]➜ Đang follow: ${res.data.data.stats.followingCount}\n[💗]➜ Thích: ${res.data.data.stats.heart}\n[🎬]➜ Số video: ${res.data.data.stats.videoCount}\n[✅]➜ Tích xanh: ${res.data.data.user.verified}\n[🔗]➜ Url: https://tiktok.com/@${res.data.data.user.uniqueId}`,attachment: fs.createReadStream(__dirname + "/cache/tkinfo.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/tkinfo.png"),event.messageID);
   return request(encodeURI(`${url1}`)).pipe(fs.createWriteStream(__dirname+'/cache/tkinfo.png')).on('close',() => callback());  
   }
  break; 

  case "search":
  case "s":{
      const search = args[1];
      if (!search) return api.sendMessage("[🐧]➜ Bạn chưa nhập từ khóa", threadID);
  const res = await axios.get(`https://caochungdat.me/docs/tiktok/search?keywords=${search}`);
   const Dungkon = res.data.data.videos;
    var url2 = res.data.data.videos.origin_cover;
    var text = '[🐧]=== 『 TIKTOK SEARCH 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n';
    for ( let i = 0; i < 10; i++) {
      text += `\n${i+1}. ${Dungkon[i].music_info.author}\n[🐧]➜ Với:\n+ ${Dungkon[i].play_count} Lượt Xem\n+ ${Dungkon[i].download_count} Lượt Tải\n`;
    };
    text += `\n[🐧]➜ Reply 1 - 10 để chọn`;
    api.sendMessage(text, event.threadID, (error, msg) => global.client.handleReply.push({
       name: this.config.name,
       messageID: msg.messageID,
       author: senderID, Dungkon
    }));
}; break;
default: api.sendMessage({body: `[🐧]=== 『 TIKTOK 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ video + url ( video/v)
[🐧]➜ music +url (music/audio/a/m)
[🐧]➜ info + user/id ( i/info)
[🐧]➜ search + keyword ( search/s)`,
    attachment: (await require('axios').get(`https://i.imgur.com/rcRecSh.png`, {
        responseType: 'stream'
    })).data
}, event.threadID);
    }        
}catch(e){
    api.sendMessage(`${e}`,threadID);
}
}
        
module.exports.handleReply = async function({ handleReply, api, event }){
  const { threadID, messageID, senderID, body } = event;
  if (senderID != handleReply.author) return api.sendMessage(`[DONATE]→ Momo/Mbbank: 0396049649. Xin cám ơn ạ!! ❤️`, threadID);
   const {
       play, title, region
   } = handleReply.Dungkon[event.args[0]-1];
   const dest = __dirname + '/cache/search_vd.mp4'; 
   api.sendMessage({body:`[🐧]➜ Tải video\n[🐧]➜ Tiêu đề: ${title}\n[🐧]➜ Quốc gia: ${region}`, attachment: await download(play, dest)}, threadID);
};
async function download(url, dest){
    await downloader.image({url, dest});
    return fs.createReadStream(dest);
};