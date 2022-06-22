const database = require("../students.service")

module.exports = {
    checkexam:async (type) => {
        var x = await new Promise((success, failure) => {    
            database.getcommands(type, async (err, results) => {
                if (err) {
                    failure(`Failed, Please email technical support: ${err}`)
                }else{
                    if (results?.action == 'yes'){
                        success(1)
                    }else{
                        success(-1)
                    }
                }
            })
        })
        console.log(x)
    }
}