const {app, ipcMain,BrowserWindow,Menu, Tray} = require('electron')
const path = require('path')
const pkg = require('./package')
const {dialog} = require('electron')
const { initialCapture,releaseCapture} =require('./src/js/capture/captureMain')

try {
  require('electron-reloader')(module)
} catch(err){
  console.log("electron load exception...")
}


let mainWindow

function createWindow () {
  //初始化屏幕截图 绑定事件等 ALT+P 开始截图
  initialCapture();

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true
    },
    width: 1000,
    height: 650,
    minHeight: 340,
    minWidth: 680
    //autoHideMenuBar:true
    })

 // and load the index.html of the app.
  console.log('window load main page:'+path.join(`file://${__dirname}`, `${pkg['main-html']}`))
  mainWindow.loadURL(path.join(`file://${__dirname}`, `${pkg['main-html']}`))


 
  //mainWindow.loadURL('https://www.dogedoge.com/');

  // mainWindow.webContents.openDevTools()
  //mainWindow.webContents.openDevTools()

  /* setup app icon*/
  const iconPath=`${__dirname}/src/static/app.ico`
  if (process.platform=='darwin'){
    app.dock.setIcon(iconPath)
  }else {
    mainWindow.setIcon(iconPath)
  }


  if (process.env.NODE_ENV === 'dev') {
    mainWindow.webContents.openDevTools();
    
    // const {
    //   default: installExtension,
    //   REACT_DEVELOPER_TOOLS,
    //   REDUX_DEVTOOLS
    // } = require('electron-devtools-installer')

    // installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    //   .then((name) => console.log(`Added Extension:  ${name}`))
    //   .catch((err) => console.log('An error occurred: ', err))
  }



  mainWindow.on('closed', function () {
    mainWindow = null
  })
}





app.on('ready', createWindow)
app.allowRendererProcessReuse = true;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    releaseCapture();
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

// initial tray
let appIcon = null
ipcMain.on('put-in-tray', (event) => {
  const iconName = process.platform === 'win32' ? '/src/static/tray/windows-icon.png' : '/src/static/tray/iconTemplate.png'
  const iconPath = path.join(__dirname, iconName)
  appIcon = new Tray(iconPath)

  const contextMenu = Menu.buildFromTemplate([{
    label: '关于',
    click: () => {
      event.sender.send('tray-info')
    }
  },
  {
    label: '退出',
    click: () => {
      event.sender.send('tray-removed')
    }
  }
])

  appIcon.setToolTip('begonia.')
  appIcon.setContextMenu(contextMenu)

  appIcon.on('click',()=>{
    console.log(mainWindow.isVisible());
    if(mainWindow.isMinimized()){
      mainWindow.restore();
    }else {
      mainWindow.minimize();
    }
  })
})


//选择文件开始
ipcMain.on('open-file-dialog', (ipc) => {
  // dialog.showOpenDialog({
  //   properties: ['openFile']
  // }, (files) => {
  //   console.log('111');
  //   if (files) {
  //     event.sender.send('selected-directory', files)
  //   }
  // })
  dialog.showOpenDialog({
    title:'打开',
    filters: [
      { name: 'Img', extensions: ['jpg', 'png', 'gif'] },
      { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile','multiSelections']
  }).then( (event) => {
    if(!event.canceled){
        //发送文件到对方
       // console.log(ipcRenderer);
       console.log(event.filePaths);
       ipc.sender.send('selected-directory', event.filePaths);
        //ipcRenderer.sendSync('selected-directory',event.filePaths);
    }
    //ipcMain.send('selected-directory', event.filePaths) 
    //console.log(event.filePaths)
  }).catch(err => {
    console.log(err)
  })
  
})
// 选择文件结束...end


//保存文件开始
ipcMain.on('save-file-dialog', (ipc) => {
  // dialog.showOpenDialog({
  //   properties: ['openFile']
  // }, (files) => {
  //   console.log('111');
  //   if (files) {
  //     event.sender.send('selected-directory', files)
  //   }
  // })
  dialog.showSaveDialog({
          title:'保存',
          filters: [{
              name: 'Images',
              extensions: ['png', 'jpg', 'gif'],
          }]
      }).then((event)=>{
        console.log(event);
          if(!event.canceled){
              //console.log(event.filePath);
              //ipc.sender.send('selected-directory', event.filePaths);
              //ipcRenderer.sendSync('selected-directory',event.filePaths);
          }
          ipc.sender.send('save-selected-directory', event.filePath); 
      }).catch(err => {
        console.log(err)
      })
})
// 保存文件结束...end


ipcMain.on('remove-tray', () => {
  appIcon.destroy()
})


app.on('window-all-closed', () => {
  if (appIcon) appIcon.destroy()
})



