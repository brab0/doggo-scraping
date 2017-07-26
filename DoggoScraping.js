require('events').EventEmitter.defaultMaxListeners = 0;

const chromeLauncher = require('chrome-launcher');
const cdp = require('chrome-remote-interface');
const Actions = require('./Actions');

module.exports = class DoggoScraping {

  	constructor(){
      this.protocol = {};
      this.chrome = {};
      this.page = {};
      this.DOM = {};
	}

	wakeUp(url, middleware) {
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
        .then(() => new Actions(null, this.page, this.DOM, url).goto(url))
        .then(doggo => {
           return middleware(doggo)
            .then(res => {
               this.die()

               return res;
            })
        });
	}

    die(){
        this.protocol.close();
        this.chrome.kill();
    }
}
