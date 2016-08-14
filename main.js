const {app, Menu, ipcMain} = require('electron')
const BrowserWindow = require('browser-window')

require('crash-reporter').start()

var mainWindow = null

const menuTemplate = [
  {
    label: 'azami',
    submenu: [
      {
        label: 'About',
        role: 'about'
      },
      {
        label: 'Preferences',
        click (item, focusedWindow) {
          focusedWindow.webContents.send('clickPreference', 'clicked')
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Services',
        role: 'services',
        submenu: []
      },
      {
        type: 'separator'
      },
      {
        label: 'Quit',
        role: 'quit'
      }
    ]
  },
  {
    label: 'Dev',
    submenu: [
      {
        label: 'Toggle Developer Tools',
        click (item, focusedWindow) {
          if (focusedWindow) {
            focusedWindow.webContents.toggleDevTools()
          }
        }
      }
    ]
  }
]

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600
  })

  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

  mainWindow.loadURL(['file://', __dirname, '/index.html'].join(''))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
