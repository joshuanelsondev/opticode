import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "path";
import fs from "fs";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const VITE_DEV_SERVER_URL = "http://localhost:5173/";
const APP_ROOT = path.join(__dirname, "..");
const RENDERER_DIST = path.join(APP_ROOT, "dist");
process.env.VITE_PUBLIC = path.join(APP_ROOT, "public");
let win;
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  {
    win.loadURL(VITE_DEV_SERVER_URL);
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
const dataFile = path.join(app.getPath("userData"), "diagnosis.json");
ipcMain.on("save-diagnosis", (event, data) => {
  let diagnosisEntries = [];
  if (fs.existsSync(dataFile)) {
    diagnosisEntries = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
  }
  diagnosisEntries.push(data);
  fs.writeFileSync(dataFile, JSON.stringify(diagnosisEntries, null, 2));
  event.reply("save-diagnosis-reply", "Diagnosis saved successfully");
});
export {
  APP_ROOT,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
