const dotenv = require("dotenv").config()
const Kavenegar = require('kavenegar');
const api = Kavenegar.KavenegarApi({
    apikey: process.env.API_KEY 
});

module.exports = api;
