// 上下文菜单

// const {
//     BrowserWindow,
//     Menu,
//     MenuItem,
//     ipcMain,
//     app
//   } = require('electron')
  
  
  
//   const menu = new Menu()
//   menu.append(new MenuItem({ label: 'copy' }))
//   menu.append(new MenuItem({ type: 'separator' }))
//   menu.append(new MenuItem({ label: 'paste'}))
  
//   app.on('browser-window-created', (event, win) => {
//     win.webContents.on('context-menu', (e, params) => {
//       menu.popup(win, params.x, params.y)
//     })
//   })
  
//   ipcMain.on('show-context-menu', (event) => {
//     const win = BrowserWindow.fromWebContents(event.sender)
//     menu.popup(win)
//   })
  