const { Menu, app, BrowserWindow, dialog,ipcMain} = require("electron");
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
  if (app.isPackaged == true) {
    if (app.isInApplicationsFolder() != true) {
      dialog
        .showCertificateTrustDialog()
        .then(() => {
          app.moveToApplicationsFolder();
        })
        .catch((reason) => {});
    }
  }
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
    win.loadFile("index.html");
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
