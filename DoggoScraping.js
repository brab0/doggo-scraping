require('events').EventEmitter.defaultMaxListeners = 0;

const chromeLauncher = require('chrome-launcher');
const cdp = require('chrome-remote-interface');
const Sniffer = require('./Sniffer');

module.exports = class DoggoScraping {

  	constructor(){
      this.protocol = {};
      this.chrome = {};
      this.page = {};
      this.DOM = {};
	}

	run(url) {        
        return chromeLauncher.launch({
            chromeFlags: ['--disable-gpu','--headless']
        })
        .then(chrome => {
            return this.chrome = chrome;
        })
        .then(chrome => {
            return cdp({port: chrome.port})
        })
        .then(protocol => {
            const {Page, DOM} = this.protocol = protocol;

            this.page = Page;
            this.DOM = DOM;

            return Promise.all([this.page.enable(), this.DOM.enable()]);
        })
        .then(() => new Sniffer(null, this.page, this.DOM).goto(url));
	}

    stop(){
        this.protocol.close();
        this.chrome.kill();
    }
}
