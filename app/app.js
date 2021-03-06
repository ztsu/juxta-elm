const {app, BrowserWindow, Menu} = require("electron");

let win;

const menu = Menu.buildFromTemplate(
  [
    {
      label: "Mayoy",
      submenu: [
        {
          role: "about"
        },
        {
          type: "separator"
        },
        {
          role: "quit"
        }
      ]
    },
    {
      label: "File",
      submenu: [
          {
              label: "New Window",
              accelerator: "Command+N",
              click: (menuItem, window) => {
                createWindow();
              }
          },
          {
            type: "separator"
          },
          {
              role: "close"
          }
      ]
    },
    {
        label: "Edit",
        submenu: [
          {
            role: "undo"
          },
          {
            role: "redo"
          },
          {
            type: "separator"
          },
          {
            role: "cut"
          },
          {
            role: "copy"
          },
          {
            role: "paste"
          },
          {
            role: "delete"
          },
          {
            role: "selectall"
          }
        ]
    },
    {
      label: "Help",
      submenu: [
        {
          label: "Keyboard Shortcuts"
        },
        {
          type: "separator"
        },
        {
          label: 'Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
          click: (item, focusedWindow) => focusedWindow && focusedWindow.webContents.toggleDevTools()
        }
      ]
    }
  ]
);

function createWindow() {

  win = new BrowserWindow(
    {
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 450,
      titleBarStyle: "hidden-inset",
      show: false
    }
  );

  win.once("ready-to-show", () => win.show());

  win.on("closed", () => {
    win = null;
  });

  Menu.setApplicationMenu(menu);

  win.loadURL(`file://${__dirname}/index.html`);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
})

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
})
