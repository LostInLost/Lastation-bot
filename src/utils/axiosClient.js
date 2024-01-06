const { default: axios } = require("axios");


module.exports.mal = axios.create({
  baseURL: 'https://api.jikan.moe/v4/',
});