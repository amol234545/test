const http = require("http")
http.createServer(function(req,res){
if (req.url == "/getd") {
// TODO get d
} else {
 if (req.url == "/") {
res.end("boo")
 }
}
})