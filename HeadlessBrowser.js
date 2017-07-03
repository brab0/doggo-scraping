module.exports = class HeadlessBrowser {

  	constructor(){
    	this.chromeLauncher = require('chrome-launcher');
		this.cdp = require('chrome-remote-interface');
        this.protocol = {};
        this.chrome = {};
        this.page = {};
        this.runtime = {};
	}

	launch() {
        return this.chromeLauncher.launch({
            chromeFlags: ['--disable-gpu','--headless']
        }).then(chrome => {
            return this.chrome = chrome;
        }).then(chrome => {
            return this.cdp({port: chrome.port})
        }).then(protocol => {
            const {Page, Runtime} = this.protocol = protocol;

            this.page = Page;
            this.runtime = Runtime;

            return Promise.all([this.page.enable(), this.runtime.enable()]);
        });
	}

    open(url){
        this.page.navigate({url: url});
        return this.page.loadEventFired();
    }

    find(expression){
        return this.runtime.evaluate({expression: expression});
    }

    quit(){
        this.protocol.close();
        this.chrome.kill();
    }
}
