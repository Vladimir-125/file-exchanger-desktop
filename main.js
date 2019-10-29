const { app, BrowserWindow, Menu } = require('electron')
const shell = require('electron').shell
const ipc = require('electron').ipcMain
const path = require('path');

const globalShortcut = require('electron').globalShortcut

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('./src/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  // create custome menu 
  var menu = Menu.buildFromTemplate([
  {
    label:'Menu',
    submenu:[
      {
        label:'Refresh',
        click(){
          // reload the page
          win.reload();
        }
      },
      {
        label:'Login',
        click(){
          // open login page
          const modalPath = path.join('file://', __dirname, 'src/login.html');
          let loginWin = new BrowserWindow({width:400, height:400, alwaysOnTop:true, webPreferences: {
            nodeIntegration: true
          }});
          // open the file
          loginWin.loadURL(modalPath);
          //win.webContents.openDevTools();

          // null win pointer after window is closed  
          loginWin.on('close', function(){loginWin=null});
          loginWin.removeMenu();
          loginWin.webContents.openDevTools()

          // show loaded file
          loginWin.show();

        }
      },
      {
        label:'simple upload',
        click(){
           win.loadFile('./src/index.html');
        }
      },
      {
        label:'secure send',
        click(){
          // open login page
          // const modalPath = path.join('file://', __dirname, 'src/secure.html');
          win.loadFile('./src/secure.html');

          // let secure = new BrowserWindow({width:600, height:400, webPreferences: {
          //   nodeIntegration: true
          // }});
          // // open the file
          // secure.loadURL(modalPath);
          // //win.webContents.openDevTools();

          // // null win pointer after window is closed  
          // secure.on('close', function(){secure=null});
          // secure.removeMenu();
          // secure.webContents.openDevTools()

          // // show loaded file
          // secure.show();

        }
      },
      {
        type:'separator'
      },
      {
        label:'Exit',
        click(){ // make the app closeable
          app.quit();
        }
      }
    ]
  },
  {
    label:'Info',
    submenu:[
    {
      label:'System architecture'
    },
    {
      label:'About'
    }
    ]
  }
  ])

  // Add custom menu to the app
  Menu.setApplicationMenu(menu);

  // add page reaload with shortcuts
  globalShortcut.register('f5', function() {
    win.reload()
  })
  globalShortcut.register('CommandOrControl+R', function() {
    win.reload()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()

  }
})

// //***//

// //***//
// function createWindow () {
//   //***//
//   globalShortcut.register('f5', function() {
//     console.log('f5 is pressed')
//     win.reload()
//   })
//   globalShortcut.register('CommandOrControl+R', function() {
//     console.log('CommandOrControl+R is pressed')
//     win.reload()
//   })
// }

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
