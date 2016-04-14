var app = require('app')
var BrowserWindow = require('browser-window')

require('crash-reporter').start()

var mainWindow = null

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 600,
    'title-bar-style': 'hidden'
  })

  mainWindow.loadURL(['file://', __dirname, '/index.html'].join(''))

  mainWindow.on('closed', function () {
    mainWindow = null
  })
})
