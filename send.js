module.exports = function(config){
    let data = []
    var ent = require("electron").net.request({
        url: "https://roblox-glitch-apis.glitch.me/sendmessage",
              method:"POST"
            })
    ent.chunkedEncoding = true
    ent.setHeader('Content-Type','application/json')
    ent.write("{")
    ent.write(`"universe":${config.universeid}`)
    ent.write(`"apikey":${config.apikey}"`)
    ent.write(`"message":${config.message}`)
    ent.end("}")
    ent.on("error",function(err){
        throw err
    })
    
    ent.on("response",function(message){
        message.on("data",function(chunk){
        data.push(chunk)
        })
    })
    let stringcombined = "" 
    ent.on("finish",function(){
    let strings = []
    
    data.forEach(function(value,index,array){
        let string = value.toString("utf-8")
        strings[index] = string
    })
    strings.forEach(function(value){
        if(stringcombined == ""){
        stringcombined == value
        }else{
        stringcombined == stringcombined + value
        }
    })
    })
}