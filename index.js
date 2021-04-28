const {app, BrowserWindow} = require('electron')
const path = require('path')
const pkg = require('./package')

try {
  require('electron-reloader')(module)
} catch(err){
  console.log("electron load exception...")
}

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 1000,
    height: 650,
    minHeight: 340,
    minWidth: 680
    })

 // and load the index.html of the app.
 console.log('window load main page:'+path.join(`file://${__dirname}`, `${pkg['main-html']}`))
  mainWindow.loadURL(path.join(`file://${__dirname}`, `${pkg['main-html']}`))

  //mainWindow.loadURL('https://www.dogedoge.com/');

  // mainWindow.webContents.openDevTools()
  //mainWindow.webContents.openDevTools()

  /* setup app icon*/
  const iconPath=`${__dirname}/src/static/dock-icon.png`
  if (process.platform=='darwin'){
    app.dock.setIcon(iconPath)
  }else {
    mainWindow.setIcon(iconPath)
  }


  if (process.env.NODE_ENV === 'dev') {
    // const {
    //   default: installExtension,
    //   REACT_DEVELOPER_TOOLS,
    //   REDUX_DEVTOOLS
    // } = require('electron-devtools-installer')

    // installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    //   .then((name) => console.log(`Added Extension:  ${name}`))
    //   .catch((err) => console.log('An error occurred: ', err))

      mainWindow.webContents.openDevTools()
  }



  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.allowRendererProcessReuse = true;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})