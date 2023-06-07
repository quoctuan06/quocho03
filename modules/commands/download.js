const download = require("image-downloader");
const fse = require("fs-extra")
module.exports.config = {
	name: "download",
	version: "1.1.1",
	hasPermssion: 2,
	credits: "DC-Nam",
	description: "Tải xuống hình ảnh qua link",
	commandCategory: "Hệ thống support-bot",
	usages: "Format + Link",
	cooldowns: 0
};
const DownLoad = async(link, path) => {
  var arr = []
  for (var i = 0; i < link.length; i++) {
await download.image({ url: link[i], dest: path })
  arr.push(fse.createReadStream(path))
  }
  return arr;
}
module.exports.run = async ({ api, event, args }) => {
  const arr = args.splice(1)
  return api.sendMessage("[🐧]-> Tải xuống hoàn tất",{attachment: await DownLoad(arr, __dirname + args[0])}, event.threadID)      
}