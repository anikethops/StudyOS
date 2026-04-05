require("dotenv").config();

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { runStudyAssistant } = require("./aiService");

console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: "#020617",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadURL("http://localhost:5173");
}

ipcMain.handle("ai:run-study-tool", async (_event, payload) => {
  try {
    const result = await runStudyAssistant(payload);
    return { ok: true, data: result };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown AI error",
    };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});