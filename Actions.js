'use strict'
const cheerio = require('cheerio');

module.exports = class Actions {

  	constructor(sniffer, page, DOM, url){
        this.page = page;
        this.DOM = DOM;
        this.sniffer = sniffer;
        this.baseUrl = url;
	}

   goto(url){
        return this.page.navigate({url: url})
        .then(() => this.page.loadEventFired())
        .then(() => this.DOM.getDocument({ depth: -1 }))
        .then(rootNode => this.DOM.getOuterHTML({ nodeId: rootNode.root.nodeId }))
        .then(pageSource => cheerio.load(pageSource.outerHTML))
        .then(sniffer => new Actions(sniffer, this.page, this.DOM, this.baseUrl));
    }

    iterate(items, middleware){
        return new Promise((resolve, reject) => {
            this.loop(items, middleware, 0, (res) => {
               resolve(res);
            })
        });
    }

    loop(items, middleware, index, cb, res = null){
      if(index < this.sniffer(items).length){
          try {
              middleware(this.sniffer(this.sniffer(items).get(index)), index)
              .then(res => this.loop(items, middleware, ++index, cb, res))
          } catch(err) {
              middleware(this.sniffer(this.sniffer(items).get(index)), index)
              this.loop(items, middleware, ++index, cb, res)
          }

      } else {
          cb(res);
      }
    }

    find(selector){
        return this.sniffer(selector);
    }
}
