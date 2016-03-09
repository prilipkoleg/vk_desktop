var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed aobserverutomatically when the JavaScript object is garbage collected.
var mainWindow = null;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 700,
        "min-height" : 400,
        "min-width"  : 500,
        show : false
    });

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/auth.html');

    // Open the DevTools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

ipc.on('startApp', function() {
    console.log('start app');
    mainWindow.loadUrl('file://' + __dirname + '/src/app.html');
    mainWindow.show();
});

ipc.on('logout', function() {
    console.log('ipc:logout!!!');
    mainWindow.webContents.session.clearStorageData({
        'storages': ['cookies', 'localstorage']
    }, function(){
        mainWindow.close();
    });
});


app.on('window-all-closed', function() {
    console.log('All windows closed: I\'m Quit!!!');
    app.quit();
});



