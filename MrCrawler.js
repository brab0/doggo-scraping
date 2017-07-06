const HeadlessBrowser = require('./HeadlessBrowser');
const ObjectNode = require('./ObjectNode');

module.exports = class MrCrawler {
	constructor(schema) {
		this.headlessBrowser = new HeadlessBrowser();
		this.operations = [];
		this.schema = schema;				
	}

	prepare(schema) {
		for (var key in schema) {			
			if (typeof schema[key] == "object") {
				if(ObjectNode.isAction(key)) {
					this.operations.push(ObjectNode.setAction(key, this.headlessBrowser));
				}

				this.prepare(schema[key]);

			} else {					
				this.operations[this.operations.length - 1][key] = schema[key]
			}
   		}
	}

	read(cb){		
		this.headlessBrowser.launch()
		.then(() => {			
			this.prepare(this.schema);

			this.deliverObj(cb);
		});
	}
	

	deliverObj(cb, counter = 0) {
		this.runOperations(res => {
			
			cb(res, counter);
			
			if(res && res != undefined){
				// console.log(res)
				this.deliverObj(cb, ++counter)
			} else {				
				console.log('fim')
				// this.headlessBrowser.quit()
			}	
		})				
	}

	runOperations(cb, index = 0) {		
		this.operations[index].exec(cb)
		.then(res => {
			if(res && res != undefined){
				// console.log(res)
				this.runOperations(cb, ++index);				
			} else {
				cb(res)
			}			
		});		
	}
}