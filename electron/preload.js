const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("studyOS", {
  runStudyTool: (payload) => ipcRenderer.invoke("ai:run-study-tool", payload),
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("StudyOS preload loaded");
});