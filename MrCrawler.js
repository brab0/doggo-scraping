const chromeLauncher = require('chrome-launcher');
const cdp = require('chrome-remote-interface');

module.exports = class MrCrawler {

  	constructor(){
      this.protocol = {};
      this.chrome = {};
      this.page = {};
      this.DOM = {};
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
         const {Page, Runtime, DOM} = this.protocol = protocol;
         
         this.page = Page;         
         this.runtime = Runtime;
         this.DOM = DOM;

         return Promise.all([this.page.enable(), this.runtime.enable(), this.DOM.enable()]);
     })
     .then(() => this.navigate(url));
	}

    stop(){
      this.protocol.close();
      this.chrome.kill();
   }

   navigate(url){
      return this.page.navigate({url: url})
      .then(res => this.page.loadEventFired());
   }   

   iterate(selector, middleware) {
		return this.evaluate(selector)
        .then(res => {
            console.log(res)
            return res;
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

    evaluate(selector){
        return this.DOM.getDocument()
        .then(result => result.root.nodeId)
        .then(nodeId => this.DOM.querySelectorAll({
            nodeId: nodeId,
            selector: selector
        }))
        .then(result => this.prepareNodes(result.nodeIds));
   }

   prepareNodes(result){
       console.log(result[0])
       this.runtime.evaluate({ expression : "document.querySelectorAll('.itens_menu a')" })
       .then(res => {
           this.runtime.callFunctionOn(res.result.objectId)
           .then(res => {
                console.log(res)
           })           
       })
    //    return this.getAttrs(result)
    //    .then(res => this.getText(result));
   }

   getAttrs(result){
        let promises = result.map(id => this.DOM.getAttributes({nodeId:id}));

        return Promise.all(promises)
        .then(items => items.map(item => item.attributes))
        .then(items => this.setAttrs(items))
   }

   getText(result){
        let promises = result.map(id => this.DOM.getAttributes({nodeId:id}));

        return Promise.all(promises)
        .then(items => {
            console.log(item)
            items.map(item => item.attributes)
        })
        .then(items => this.setAttrs(items))
   }

   setAttrs(items){
       return items.map(item => {            
            return item.reduce(function(arr, cur, index, array) {                    
                if(index % 2 == 0){                    
                    let n = {};
                    n[cur] = {};

                    return Object.assign(n, arr);
                } else {
                    arr[array[index - 1]] = cur;

                    return arr;
                }               
            }, {})
        });
   }
}
