import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "node:url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDevelopment = import.meta.env.MODE === "development";

export const VITE_DEV_SERVER_URL = isDevelopment
  ? import.meta.env.VITE_DEV_SERVER_URL
  : undefined;
export const MAIN_DIST = path.join(__dirname, "..");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = isDevelopment
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(createWindow);

// Save Diagnosis Codes to a JSON file
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
