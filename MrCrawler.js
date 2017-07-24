const chromeLauncher = require('chrome-launcher');
const cdp = require('chrome-remote-interface');

module.exports = class MrCrawler {

  	constructor(){
      this.protocol = {};
      this.chrome = {};
      this.page = {};
      this.runtime = {};
	}

	go(url) {
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
         const {Page, Runtime} = this.protocol = protocol;
         this.page = Page;
         this.runtime = Runtime;

         return Promise.all([this.page.enable(), this.runtime.enable()]);
     })
     .then(() => this.navigate(url));
	}

   navigate(url){
      return this.page.navigate({url: url})
      .then(res => this.page.loadEventFired());
   }

   evaluate(expression){
      return this.runtime.evaluate({
         expression: expression,
         returnByValue : true
      });
   }

   iterate(pattern, middleware) {
		return this.evaluate(pattern)
      .then(res => {
         console.log(res.result.value[0].length)
         return Array.from(res.result.value).map(function(element) {
            return element
         });
      })
      .then(items => {
         console.log(items)
         return this.loop(items, middleware, 0)
      })
	}

   loop(items, middleware, index) {
		return new Promise((resolve, reject) => {

         middleware(items)

         if(index === items[index].result.length){
            resolve();
         } else {
            this.loop(items, middleware, ++index)
         }
		});
	}

   stop(){
      this.protocol.close();
      this.chrome.kill();
   }
}
