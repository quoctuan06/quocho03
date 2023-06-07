module.exports.config = {
	name: "cuoptien",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "Mirai Team",
	description: "là cướp đó",
	commandCategory: "Game",
	usages: "cuoptien",
	coo10downs: 5
};

module.exports.run = async function({ api, event, Users, Currencies }) {
	var alluser = global.data.allUserID
    let victim = alluser[Math.floor(Math.random() * alluser.length)];
    let nameVictim = (await Users.getData(victim)).name
    if (victim == api.getCurrentUserID() && event.senderID == victim) return api.sendMessage('[🐧]→ Rất tiếc, bạn không thể ăn cắp từ người này. Vui lòng thử lại.', event.threadID, event.messageID);
    var route = Math.floor(Math.random() * 2);
    if (route > 1 || route == 0) {
    const moneydb = (await Currencies.getData(victim)).money;
       var money = Math.floor(Math.random() * 1000) + 1;
        if (moneydb <= 0 || moneydb == undefined) return api.sendMessage(`[🐧]→ Bạn vừa ăn cắp ${nameVictim} là một người nghèo. Vì vậy, bạn không có gì`, event.threadID, event.messageID);
        else if (moneydb >= money) return api.sendMessage(`[🐧]→ Bạn vừa lấy trộm ${money} đô từ ${nameVictim} trong nhóm này`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
        else if (moneydb < money) return api.sendMessage(`[🐧]→ Bạn vừa ăn cắp tất cả ${moneydb} số dư của ${nameVictim} trong nhóm này`, event.threadID, async () => {
            await Currencies.increaseMoney(victim, parseInt("-"+money))
            await Currencies.increaseMoney(event.senderID, parseInt(money))
        }, event.messageID);
    }
    else if (route == 1) {
        var name = (await Users.getData(event.senderID)).name
        var moneyuser = (await Currencies.getData(event.senderID)).money
            if (moneyuser <= 0) return api.sendMessage("[🐧]→ Bạn không có tiền, HÃY LÀM VIỆC ĐỂ CÓ ĐƯỢC MỘT SỐ TIỀN LÀM VỐN.", event.threadID, event.messageID);
            else if (moneyuser > 0) return api.sendMessage(`[🐧]→ Bạn đã bị bắt và mất ${moneyuser} đô.`, event.threadID, () => api.sendMessage({ body: `[🐧]→ Xin chúc mừng  ${nameVictim}! Bạn đã bắt được ${name} và nhận được ${Math.floor(moneyuser / 2)} đô làm phần thưởng!`, mentions: [{ tag: nameVictim, id: victim }, { tag: name, id: event.senderID }] }, event.threadID, async () => {
                await Currencies.increaseMoney(event.senderID, parseInt("-"+ moneyuser))
                await Currencies.increaseMoney(victim, parseInt(Math.floor(moneyuser / 2))) 
            }), event.messageID);
        
    }
}