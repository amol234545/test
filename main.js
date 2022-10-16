const { Menu, app, BrowserWindow, dialog,screen} = require("electron");
const http = require("http")
const path = require("path")
const config = require(path.join(__dirname,"config.json"))
Menu.setApplicationMenu(null);
app.whenReady().then(() => {
  let win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      accessibleTitle: "test",
      contextIsolation: false,
      devTools: false,
    },
  });
  win.loadFile("index.html");
  var server = http.createServer(function(req,res){
    if (req.url == "/getxy") {
    res.useChunkedEncodingByDefault =false
    let {x,y} = screen.getCursorScreenPoint()
    res.end(`{"x":"${x}","y":"${y}"}`,"utf-8")
    } else {
     if (req.url == "/") {
    res.end("boo")
     } else {
      if (req.url = "/close") {
        server.close()
      }
     }
    }
    })
    var port = Math.round(3673) // Rounds to 3000
    var urlt = "http://localhost:" + port
    console.log(urlt)
    server.listen(port)
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    let win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        accessibleTitle: "RoTools",
        contextIsolation: false,
      },
    });
    var server = http.createServer(function(req,res){
      if (req.url == "/getxy") {
      res.useChunkedEncodingByDefault =false
      let {x,y} = screen.getCursorScreenPoint()
      res.end(`{"x":"${x}","y":"${y}"}`,"utf-8")
      } else {
       if (req.url == "/") {
      res.end("boo")
       } else {
        if (req.url = "/close") {
          server.close()
        }
       }
      }
      })
      var port = Math.round(3673) // Rounds to 3000
      var urlt = "http://localhost:" + port
      console.log(urlt)
      server.listen(port)
    win.loadFile("index.html");
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
