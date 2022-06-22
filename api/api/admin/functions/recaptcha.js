const config = require('../../../configs/configs')
const fetch = require('node-fetch')

async function request(url){
    try {
    const response = await fetch(url);
    const json = await response.json();
    return await json
    }catch(error){
        console.log(error);
        return false
    }
}


module.exports = {
   verify: async function (token, ip){
        if(token === undefined || token === '' || token === null) {
            return false
        }
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + config.recaptcha.secretkey + "&response=" + token + "&remoteip=" + ip;
        body = await request(verificationUrl)
        if(body.success == undefined || body.success == false) {
            return false
        }
        return true
    }
}