const cheerio = require('cheerio');

module.exports = class Actions {

  	constructor(evaluator, page, DOM, url){
        this.page = page;
        this.DOM = DOM;
        this.evaluator = evaluator;
        this.url = url;
	}

   goto(url){        
        return this.page.navigate({url: url})
        .then(() => this.page.loadEventFired())
        .then(() => this.DOM.getDocument({ depth: -1 }))
        .then(rootNode => this.DOM.getOuterHTML({ nodeId: rootNode.root.nodeId }))
        .then(pageSource => cheerio.load(pageSource.outerHTML))
        .then(evaluator => new Actions(evaluator, this.page, this.DOM, url));
    }

    iterate(items, middleware){
        return new Promise((resolve, reject) => {
            this.loop(items, middleware, 0, (res) => {
               resolve(res);
            })
        });
    }

    loop(items, middleware, index, cb, res = null){
      if(index < this.evaluator(items).length){
          if(middleware instanceof Promise){
              return middleware(this.evaluator(this.evaluator(items).get(index)), index)
              .then(res => this.loop(items, middleware, ++index, cb, res))
          } else {
              middleware(this.evaluator(this.evaluator(items).get(index)), index)
              this.loop(items, middleware, ++index, cb, res)
          }

      } else {
          cb(res);
      }
    }

    eval(selector){
        return this.evaluator(selector);
    }
}
