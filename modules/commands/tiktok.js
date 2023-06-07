module.exports.config = {
    name: 'tiktok',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: 'TikTok',
    commandCategory: 'Phương tiện',
    usages: '[key word | key word + #hastag], [video + url | audio + url], [info + username], [trending]',
    cooldowns: 2,
    dependencies: {
        'image-downloader': '',
    }
};
const CN = 'https://docs-api.jrtxtracy.repl.co';
const {
    get
} = require('axios');
const {
    createReadStream,
    unlinkSync,
    mkdirSync,
    rmdirSync
} = require('fs-extra');
const {
    image
} = require('image-downloader');
const roof = n => +n != +Math.floor(n) ? +Math.floor(n) + 1: +n;
const localeStr = n => ((+n).toLocaleString()).replace(/,/g, '.');
module.exports.run = function({
    api, event, args
}) {
    if (/https:\/\/(\w+\.)?tiktok+\.com\//.test(args[1])) return get(`${CN}/tiktok/download?link=${args[1]}`).then(async response_api => {
        if (args[0] == 'video') {
            const msg_info = `${infoVideo(response_api.data)}\n\n[🐧]➜ Reply [ sd | wm | hd ] để tải video !.`;
            const path = `${__dirname}/cache/tiktok_thumbnail_video_${event.messageID}.jpg`;
           await api.sendMessage({
                body: msg_info, attachment: await downLoad(response_api.data.origin_cover, path)}, event.threadID, (a, b) => {
                    global.client.handleReply.push({
                       name: this.config.name, messageID: b.messageID, author: event.senderID, data: response_api.data,
                       'case': 'download-video'
                    });
                    unlinkSync(path);
                    }, event.messageID);
    };
    if (args[0] == 'audio') {
        const msg_info_audio = `${infoAudio(response_api.data)}\n\n[🐧]➜ Reaction để tải nhạc !.`;
        const path = `${__dirname}/cache/tiktok_thumbnail_audio_${event.messageID}.jpg`;
        const down = await downLoad(response_api.data.music_info.cover, path);
        const msg = {body: msg_info_audio, attachment: down};
        api.sendMessage(msg, event.threadID, (a, b) => {
            global.client.handleReaction.push({
            name: this.config.name, messageID: b.messageID, senderMessageID: event.messageID, author: event.senderID, url_audio: response_api.data.music, 'case': 'download-audio'
            });
            unlinkSync(path);
            }, event.messageID);
    };
        }).catch(e => api.sendMessage(`${e}`, event.threadID, event.messageID));
        if (args[0] == 'info') return get(`${CN}/tiktok?username=${args[1]}`).then(async response_api => JSON.stringify(response_api.data.userInfo) == '{}' ? api.sendMessage(`[🐧]➜ Không tìm thấy kết quả nào của người dùng ${args[1]}`, event.threadID, event.messageID): api.sendMessage({body: infoUser(response_api.data), attachment: await downLoad(response_api.data.userInfo.user.avatarLarger, `${__dirname}/cache/tiktok_info_user_${event.messageID}.jpg`)}, event.threadID, () => unlinkSync(`${__dirname}/cache/tiktok_info_user_${event.messageID}.jpg`), event.messageID)).catch(e => api.sendMessage(e, event.threadID, event.messageID));
        if (args[0] == 'trending') return get(`${CN}/tiktok/trending`).then(response_api => runInfoTrending(response_api.data, api, event, this.config.name, 6, +args[1] || 1, 'video')).catch(e => api.sendMessage(e, event.threadID, event.messageID));
        get(`${CN}/tiktok?search=${encodeURI(args.join(' '))}`).then(response_api => runInfoSearch(response_api.data, api, event, this.config.name, 6, 1, 'video')).catch(e => api.sendMessage(`${e}`, event.threadID, event.messageID));
};
module.exports.handleReply = async function({ handleReply: $, api, event }){
    if (event.senderID != $.author) return;
    const lower1 = event.args[0].toLowerCase();
    const lower2 = !event.args[1] ? '':event.args[1].toLowerCase();
    switch ($.case) {
        case 'download-video': {
            if (!['sd', 'wm', 'hd'].includes(lower1)) return api.sendMessage(`[🐧]➜ Không đúng định dạng !.`, event.threadID, event.messageID);
          get($.data[(lower1 == 'sd' ? '': lower1)+'play'], {responseType: 'stream'}).then(response_video => api.sendMessage({attachment: response_video.data}, event.threadID, event.messageID)).catch(e => api.sendMessage(`${e}`, event.threadID, event.messageID));
        }; break;
         case 'trending': {
           if (lower1 == 'trang'){
               if (isFinite(lower2) && lower2 <= roof($.data.data.length/6)) /* yeuTrang */ return runInfoTrending($.data, api, event, this.config.name, 6, +lower2, $.menu); else return api.sendMessage(`[🐧]➜ Không tìm thấy Trang ${lower2} trong danh sách`, event.threadID, event.messageID);
           };
           if (isFinite(lower1) && !!lower2 && !['wm'].includes(lower2)) return api.sendMessage(`[🐧]➜ Không đúng định dạng !.`, event.threadID, event.messageID);
           const data = $.data.data[(+lower1)-1];
           const info = $.menu == 'video' ? {url: data[(!lower2 ? '': lower2)+'play'], msg: infoVideo(data)}: {url: data.music, msg: infoAudio(data)};
           get(info.url, {responseType: 'stream'}).then(response => api.sendMessage({body: info.msg, attachment: response.data}, event.threadID, event.messageID)).catch(e => api.sendMessage(e, event.threadID, event.messageID));
         }; break;
         case 'search': {
             if (lower1 == 'trang'){
               if (isFinite(lower2) && lower2 <= roof($.data.length/6)) /* yeuTrang */ return runInfoSearch($.data, api, event, this.config.name, 6, +lower2, $.menu); else return api.sendMessage(`[🐧]➜ Không tìm thấy Trang ${lower2} trong danh sách`, event.threadID, event.messageID);
           };
           if (isFinite(lower1)) {
               const data = $.data[(+lower1)-1];
               const path = `${__dirname}/cache/tiktok_download_${event.senderID}_${event.messageID}`;
               const info = $.menu == 'video' ? {url: data.video.downloadAddr, path: path + '.mp4',  msg: infoVideoSearch(data)}: {url: data.music.playUrl, path: path + '.mp3', msg: infoAudioSearch(data)};
               await api.sendMessage({body: info.msg, attachment: (await downLoad(info.url, info.path))}, event.threadID, () => unlinkSync(info.path), event.messageID);
           };
         };
    };
};
module.exports.handleReaction = function({ handleReaction: $, api, event }) {
    if (event.userID != $.author) return;
    switch ($.case) {
        case 'download-audio': {
          get($.url_audio, {responseType: 'stream'}).then(response_audio => api.sendMessage({attachment: response_audio.data}, event.threadID, $.senderMessageID)).catch(e => api.sendMessage(`${e}`, event.threadID, $.senderMessageID));
        }; break;
       case 'trending': runInfoTrending($.data, api, event, this.config.name, 6, 1, $.menu == 'video' ? 'audio': 'video'); 
        ;break;
        case 'search': runInfoSearch($.data, api, event, this.config.name, 6, 1, $.menu == 'video' ? 'audio': 'video');
        break;
    };
};
async function downLoad(a, b) {
    await image({
        url: a, dest: b
    });
    return createReadStream(b);
};
function infoVideo(a){
    return `[🐧]=== 『𝑰𝑵𝑭𝑶 𝑻𝑰𝑲𝑻𝑶𝑲 𝑽𝑰𝑫𝑬𝑶』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Country: ${a.region}\n[🐧]➜ Caption: ${a.title.split(' ').filter(i => !i.startsWith('#')).join(' ')}\n[🐧]➜ Hastag: ${a.title.split(' ').filter(i => i.startsWith('#')).join(', ')}\n[🐧]➜ Like: ${localeStr(a.digg_count)}\n[🐧]➜ Comments: ${localeStr(a.comment_count)}\n[🐧]➜ Share: ${localeStr(a.share_count)}\n[🐧]➜ Download: ${localeStr(a.download_count)}\n[🐧]➜ Post Time: ${new Date(a.create_time).toLocaleString()}\n[🐧]➜ Durations video: ${a.duration}s\n\n[🐧]=== 『𝑨𝑼𝑻𝑯𝑶𝑹』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ ID User Unique: ${a.author.unique_id}\n[🐧]➜ Name: ${a.author.nickname}`;
};
function infoAudio(a){
    return `[🐧]=== 『𝑰𝑵𝑭𝑶 𝑻𝑰𝑲𝑻𝑶𝑲 𝑨𝑼𝑫𝑰𝑶』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Name Audio: ${a.music_info.title}\n[🐧]➜ Durations Audio: ${a.music_info.duration}s\n\n[🐧]=== 『𝑨𝑼𝑻𝑯𝑶𝑹』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Name: ${a.music_info.author}\n[🐧]➜ Originals: ${a.music_info.original == true ? 'Đúng': 'Không'}`;
};
function infoUser(a){
    return `[🐧]=== 『𝑻𝑰𝑲𝑻𝑶𝑲𝑬𝑹 𝑰𝑵𝑭𝑶』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ ID User Unique: ${a.userInfo.user.uniqueId}\n[🐧]➜ NickName: ${a.userInfo.user.nickname}\n[🐧]➜Tiểu sử: ${a.userInfo.user.signature||'Không có'}\n[🐧]➜ Bio Link: ${!a.userInfo.user.bioLink ? 'Không có': a.userInfo.user.bioLink.link}\n[🐧]➜ Private Account: ${a.userInfo.user.privateAccount == false ? 'Không': 'có'}\n\n[🐧]=== 『𝑺𝑻𝑨𝑻𝑺』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Follow: ${localeStr(a.userInfo.stats.followingCount)}\n[🐧]➜ Followers: ${localeStr(a.userInfo.stats.followerCount)}\n[🐧]➜ Total Heart: ${localeStr(a.userInfo.stats.heartCount)}\n[🐧]➜ Number Highest Hearts: ${a.userInfo.stats.diggCount}\n[🐧]➜ Total Video: ${localeStr(a.userInfo.stats.videoCount)}`;
};
async function runInfoTrending(a, b, c, d, e, g, h) {
    const dirTD = `${__dirname}/cache/tiktok_trending_${c.senderID}_${c.messageID}`;
            mkdirSync(dirTD);
            const attachment = [];
            var txt = `[🐧]=== 『𝑻𝑹𝑬𝑵𝑫𝑰𝑵𝑮 𝑻𝑰𝑲𝑻𝑶𝑲 ${h}』 ===[🐧]\n\n`.toUpperCase();
           if (h == 'audio') {
               for (var i = (e*g)-e; i < e*g; i++) {
                if (!a.data || !a.data[i]) break;
                const {title, cover, duration} = a.data[i].music_info;
                const arrSp = cover.split('/');
                const dest = 
                `${dirTD}/${arrSp[arrSp.length-1].replace(/\/|\||\x|\:|\~|\%|\_|\-|\&|\=|\.|\?/g, '')}.jpg`;
                txt += `${i+1}. ${title}\n[🐧]➜ Durations Audio: ${duration}s\n\n`;
                await image({url: cover, dest});
               attachment.push(createReadStream(dest)); 
            };
            txt += `[🐧]➜ Trang [${g}/${roof(a.data.length/e)}]\n[🐧]➜ Reply [STT] để tải audio.\n[🐧]➜ Reply [trang + số trang] để để chuyển tab.\n[🐧]➜ [Reaction] để chuyển qua danh sách video.`;
           } else {
               for (var i = (e*g)-e; i < e*g; i++) {
                if (!a.data || !a.data[i]) break;
                const {title, origin_cover, duration} = a.data[i];
                const arrSp = origin_cover.split('/');
                const dest = 
                `${dirTD}/${arrSp[arrSp.length-1].replace(/\/|\||\x|\:|\~|\%|\_|\-|\&|\=|\.|\?/g, '')}.jpg`
                txt += `${i+1}. ${title.split(' ').filter(i => !i.startsWith('#')).join(' ')}\n[🐧]➜ Hastag: ${title.split(' ').filter(i => i.startsWith('#')).join(', ')}\n[🐧]➜ Durations Video: ${duration}s\n\n`;
                await image({url: origin_cover, dest});
               attachment.push(createReadStream(dest)); 
            };
            txt += `[🐧]➜ Trang [${g}/${roof(a.data.length/e)}]\n[🐧]➜ Reply [STT | STT + wm] để tải video.\n[🐧]➜ Reply [trang + số trang] để để chuyển tab.\n[🐧]➜ [Reaction] để chuyển qua danh sách audio.`;
           };
            await b.sendMessage({body: txt, attachment}, c.threadID, (y, z) => {
                const option = {
                    name: d,
                    messageID: z.messageID,
                    author: c.userID || c.senderID,
                    data: a,
                    menu: h,
                    'case': 'trending'
                }
                global.client.handleReply.push(option),
                global.client.handleReaction.push(option);
                rmdirSync(dirTD, {recursive: true});
                });
};
function infoVideoSearch(a){
    return `[🐧]=== 『 𝑰𝑵𝑭𝑶 𝑻𝑰𝑲𝑻𝑶𝑲 𝑽𝑰𝑫𝑬𝑶 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Captions: ${a.desc.split(' ').filter(i => !i.startsWith('#')).join(' ')}\n[🐧]➜ Hastag: ${a.desc.split(' ').filter(i => i.startsWith('#')).join(', ')}\n\n[🐧]=== 『𝑺𝑻𝑨𝑻𝑺』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Heart: ${localeStr(a.stats.diggCount)}\n[🐧]➜ Comment: ${localeStr(a.stats.commentCount)}\n[🐧]➜ Share: ${localeStr(a.stats.shareCount)}\n[🐧]➜ Durations Video: ${a.video.duration}s\n[🐧]➜ Post Time: ${new Date(a.createTime).toLocaleString()}\n\n[🐧]=== 『𝑨𝑼𝑻𝑯𝑶𝑹』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ ID Unique: ${a.author.uniqueId}\n[🐧]➜ NickName: ${a.author.nickname}`;
};
function infoAudioSearch(a){
 return `[🐧]=== 『𝑰𝑵𝑭𝑶 𝑻𝑰𝑲𝑻𝑶𝑲 𝑨𝑼𝑫𝑰𝑶』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ Name Audio: ${a.music.title}\n[🐧]➜ Durations Audio: ${a.music.duration}s\n[🐧]➜ Original Audio: ${a.music.original == true ? 'Đúng': 'Không'}\n\n[🐧]=== 『𝑨𝑼𝑻𝑯𝑶𝑹』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n[🐧]➜ ID Unique: ${a.author.uniqueId}\n[🐧]➜ Nick Name: ${a.music.authorName}`;
};
async function runInfoSearch(a, b, c, d, e, g, h){
    const dirTD = `${__dirname}/cache/tiktok_search_${c.senderID}_${c.messageID}`;
    mkdirSync(dirTD);
    const attachment = [];
    var txt = `[🐧]=== 『𝑰𝑵𝑭𝑶 ${h} 𝑻𝑰𝑲𝑻𝑶𝑲 』 ===[🐧]\n◆━━━━━━━━━━━━━━━━◆\n\n`.toUpperCase();
    if (h == 'audio') {
        for (var i = (e*g)-e; i < e*g; i++){
     if (!a || !a[i]) break;
     const {title, coverLarge, duration} = a[i].music;
     const arrSp = coverLarge.split('/');
     const dest = `${dirTD}/${arrSp[arrSp.length-1].replace(/\/|\||\x|\:|\~|\%|\_|\-|\&|\=|\.|\?/g, '')}.jpg`;
     txt += `${i+1}. ${title}\n[🐧]➜ Durations: ${duration}s\n\n`;
     await image({url: coverLarge, dest});
      attachment.push(createReadStream(dest));
    };
    txt += `[🐧]➜ Trang [${g}/${roof(a.length/e)}]\n[🐧]➜ Reply [STT] để tải Audio.\n[🐧]➜ Reply [trang + số trang] để để chuyển tab.\n[🐧]➜ [Reaction] để chuyển qua danh sách Video.`;
        } else {
        for (var i = (e*g)-e; i < e*g; i++){
     if (!a || !a[i]) break;
     const {desc, video} = a[i];
     const arrSp = video.originCover.split('/');
     const dest = `${dirTD}/${arrSp[arrSp.length-1].replace(/\/|\||\x|\:|\~|\%|\_|\-|\&|\=|\.|\?/g, '')}.jpg`;
     txt += `${i+1}. ${desc}\n[🐧]➜ Durations: ${video.duration}s\n\n`;
     await image({url: video.originCover, dest});
      attachment.push(createReadStream(dest));
    };
    txt += `[🐧]➜ Trang [${g}/${roof(a.length/e)}]\n[🐧]➜ Reply [STT] để tải Video.\n[🐧]➜ Reply [trang + số trang] để để chuyển tab.\n[🐧]➜ [Reaction] để chuyển qua danh sách audio.`;
    };
    await b.sendMessage({body: txt, attachment}, c.threadID, (y, z) => {
                const option = {
                    name: d,
                    messageID: z.messageID,
                    author: c.userID || c.senderID,
                    data: a,
                    menu: h,
                    'case': 'search'
                }
                global.client.handleReply.push(option),
                global.client.handleReaction.push(option);
                rmdirSync(dirTD, {recursive: true});
                });
};