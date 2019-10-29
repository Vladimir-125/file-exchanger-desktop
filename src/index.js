const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer
const axios = require('axios');

const notifyBtn = document.getElementById('notifyBtn');
const price = document.querySelector('h1')
const targetPrice = document.getElementById('targetPrice')

var targetPriceVal

const notification = {
	title: 'BTC Alert',
	body: 'BTC just beat your target price!'
}

function getBTC(){
	axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
		.then(res=>{
			const cryptos = res.data.BTC.USD
			price.innerHTML = '$' + cryptos.toLocaleString('en');

			if(targetPrice.innerHTML!= '' && targetPriceVal << res.data.BTC.USD){
				const myNotification = new window.Notification(notification.title, {body:notification.body});
			}
		})
}

getBTC()

setInterval(getBTC, 3000);

notifyBtn.addEventListener('click', function(event){
	// notifyBtn Clicked
	const modalPath = path.join('file://', __dirname, 'add.html');
	let win = new BrowserWindow({width:400, height:200, alwaysOnTop:true, webPreferences: {
    nodeIntegration: true
  }});
	// open the file
	win.loadURL(modalPath);
	//win.webContents.openDevTools();

	// null win pointer after window is closed	
	win.on('close', function(){win=null});
	// show loaded file
	win.show();
});

ipc.on('targetPriceVal', function(event, arg){
	targetPriceVal = Number(arg);
	targetPrice.innerHTML = '$' + targetPriceVal.toLocaleString('en');
})