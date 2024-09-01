require('dotenv').config()
const Pepesan = require("pepesan");
const keep_alive=require("./keep_alive.js")
const router = require("./router");
const { ALLOWED_NUMBERS } = process.env;

(async () => {
    const config = {
        allowedNumbers: ALLOWED_NUMBERS ? ALLOWED_NUMBERS.split(',') : null,
        browserName: 'tonz app'
    }
    const pepesan = Pepesan.init(router, config)
    await pepesan.connect()
})()