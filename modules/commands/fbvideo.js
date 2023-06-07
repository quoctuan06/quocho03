let axios = require('axios');

let streamURL = (url, type)=>axios.get(url, {
  responseType: 'arraybuffer'
}).then(res=> {
  let path = __dirname+'/cache/'+Date.now()+'.'+type;

  require('fs').writeFileSync(path, res.data);
  setTimeout(p=>require('fs').unlinkSync(p), 1000*60, path);

  return require('fs').createReadStream(path);
});

exports.config = {
  name: 'fbvideo',
  version: '0.0.1',
  hasPermssion: 0,
  credits: 'DC-Nam',
  description: 'Facebook.',
  commandCategory: 'Phương tiện',
  usages: 'fbvideo + url',
  cooldowns: 3
};
exports.run = function(o) {
  let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
  if (!o.args[0] || !/^http(s|):\/\//.test(o.args[0]))return send(`[🐧] ➜ Invalid URL`);
  axios.get('https://docs-api.jrtxtracy.repl.co/facebook/video?url='+o.args[0]).then(async res=>send({body:`=== 『 DOWNLOAD FBVIDEO 』 ===\n━━━━━━━━━━━━━━━━\n[🐧] ➜ Link video facebook: ${res.data.url}\n[🐧] ➜ Link ảnh: ${res.data.thumbnail}`,
    attachment: await streamURL(res.data.hd, 'mp4')
  })).catch(err=>send(err.message));
};