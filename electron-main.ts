import { app, BrowserWindow, screen } from 'electron';
import path from 'path';

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  
  // We want a narrow sidebar on the right side
  const sidebarWidth = 400;

  const win = new BrowserWindow({
    width: sidebarWidth,
    height: height,
    x: width - sidebarWidth,
    y: 0,
    alwaysOnTop: true, // This keeps Mercury visible during your speech
    frame: false,      // Makes it look like a sleek widget
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // In production, you'd load the built index.html
  // In development, you load the dev server URL
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../dist/index.html')}`;
  win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
