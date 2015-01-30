/* NODE DEPENDENCIES*/
var fs = require('fs'),
	crypto = require('crypto'),
	path = require('path'),
	request = require('request'),
	zlib = require('zlib'),
	fs = require('fs'),
	gui = require('nw.gui'), //or global.window.nwDispatcher.requireNwGui() (see https://github.com/rogerwang/node-webkit/issues/707)
	win = gui.Window.get(); // Get the current window

function configureLogoutOnClose()
{
	win.on('close', function() {
		logoutFromOpenSubtitle(); // API.js
		this.hide(); // Pretend to be closed already
	  	this.close(true);
	});
}

function chooseFile(name) 
{
	var chooser = document.querySelector(name);
	chooser.addEventListener("change", function(evt) {
		console.log(this.value);
		getHash(this.value);
	}, false);

	chooser.click();  
}

configureLogoutOnClose();