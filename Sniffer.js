'use strict'
const cheerio = require('cheerio');

module.exports = class Sniffer{

  	constructor(sniffer, page, DOM){
        this.page = page;
        this.DOM = DOM;
        this.sniffer = sniffer;        
	}

    goto(url){
        return this.page.navigate({url: url})
        .then(() => this.page.loadEventFired())
        .then(() => this.DOM.getDocument({ depth: -1 }))
        .then(rootNode => this.DOM.getOuterHTML({ nodeId: rootNode.root.nodeId }))
        .then(pageSource => cheerio.load(pageSource.outerHTML))
        .then(sniffer => new Sniffer(sniffer, this.page, this.DOM));
    }

    iterate(items, middleware, index = 0){
        return new Promise((resolve, reject) => {
            if(index < this.sniffer(items).length){                
                try {
                    middleware(this.sniffer(this.sniffer(items).get(index)), index)
                    .then(() => this.iterate(items, middleware, ++index))
                } catch(err) {
                    middleware(this.sniffer(this.sniffer(items).get(index)), index)
                    this.iterate(items, middleware, ++index)
                }
                            
            } else {
                resolve();
            }            
        });
    }
    
    find(selector){
        return this.sniffer(selector);
    }
}