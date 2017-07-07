const HeadlessBrowser = require('./HeadlessBrowser');
const ObjectNode = require('./ObjectNode');

module.exports = class MrCrawler {

	constructor(schema) {
		this.headlessBrowser = new HeadlessBrowser();
		this.operations = [];
		this.schema = schema;
	}

	/*
	*	extracts and format operations from schema to be executed
	*/

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

	/*
	*	starts headless-chrome and pretends a reader for client use
	*/

	read(cb){
		this.headlessBrowser.launch()
		.then(() => {
			this.prepare(this.schema);
			this.deliverObj(cb);
		});
	}

	/*
	*	The real reader. After all operations are collected, call them
	*	and return an object
	*/

	deliverObj(cb, counter = 0) {
		this.runOperations(res => {

			if(res && res != undefined){
				cb(res, counter);
				this.deliverObj(cb, ++counter)
			} else {
				console.log('fim')
				// this.headlessBrowser.quit()
			}
		})
	}

	/*
	*	iterate over all instrunction sequentially and then returns the
	*   gotten object back to the client
	*/

	runOperations(cb, index = 0) {
		return this.operations[index].exec()
		.then(res => {
			if(parseInt(this.operations.length - index) > 0){
				// console.log(res)
				this.runOperations(++index);
			} else {
				cb(res)
			}
		});
	}
}
