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

   /*
   * Initialize launcher to open headless chrome
   */

	wakeUp(url, middleware) {
        return chromeLauncher.launch({
            chromeFlags: ['--disable-gpu','--headless']
        })
        .then(chrome => {
            return this.chrome = chrome;
        })
        .then(chrome => {
            return cdp({port: chrome.port})  // returns protocol to expose api
        })
        .then(protocol => {
            const {Page, DOM} = this.protocol = protocol;

            this.page = Page;
            this.DOM = DOM;

            return Promise.all([this.page.enable(), this.DOM.enable()]);
        })
        .then(() => {
           /*
           *   instantiate an Actions object to call goto method after
           *   chrome is ready. This method also instantiate itself
           *   to expose these actions in the right context.
           */
           return new Actions(null, this.page, this.DOM, url).goto(url)
        })
        .then(doggo => {

            /*
            *  Decides which handler should be used. If returns a Promise,
            *  then use Try middleware. Else execute as a normal function
            */

            console.log(middleware instanceof Promise)

            if(middleware instanceof Promise){
                console.log('asd')
                return middleware(doggo)          // returning to allow the wakeUp promise chain
                .then(res => {
                    this.die();                   // after everything is done, terminate laucher
                    return res;                   // respose to the wakeUp promise chain
                })
            } else {                
                this.die();                       // after everything is done, terminate laucher
                return middleware(doggo);         // non-promise response
            }
        });
	}

   /*
   * terminate launcher
   */

    die(){
        this.protocol.close();
        this.chrome.kill();
    }
}
