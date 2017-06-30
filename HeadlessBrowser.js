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
        this.chromeLauncher.launch({
            chromeFlags: ['--disable-gpu','--headless']
        }).then(chrome => {
            this.chrome = chrome;

  	        this.cdp({port: chrome.port}).then(protocol => {

    	  		const {Page, Runtime} = this.protocol = protocol;

                this.page = Page;
                this.runtime = Runtime;

    	  		Promise.all([this.page.enable(), this.runtime.enable()]).then(() => {
                    return goTo;
                });

	  	    });
        });
	}

    goTo(url){
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
