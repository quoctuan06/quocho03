const axios = require('axios');
async function getData(url) {
    var { data } = await axios(`https://docs-api.jrtxtracy.repl.co/soundcloud?url=${encodeURI(url)}`);
    return data
}

async function search(keywords, limit) {
    var { data } = await axios.get(`https://docs-api.jrtxtracy.repl.co/soundcloud?search=${encodeURI(keywords)}&limit=${limit || 10}`);
    return data
}
module.exports = {
    getData,
    search
}