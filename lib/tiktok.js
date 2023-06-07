const axios = require('axios');
const searchVideo = async (keywords) => {
  var { data } = await axios(`https://docs-api.catteam123.repl.co/tiktok?search=${encodeURI(keywords)}`);
  return data
};

const getData = async (url) => {
  var { data } = await axios(`https://docs-api.catteam123.repl.co/tiktok?url=${url}`);
  return data
};
const getInfoUser = async (username) => {
  var { data } = await axios.get(`https://docs-api.catteam123.repl.co/tiktok?username=${username}`)
  return data
}

module.exports = {
  getData,
  searchVideo,
  getInfoUser
}
