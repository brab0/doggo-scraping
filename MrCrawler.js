const HeadlessBrowser = require('./HeadlessBrowser');
const ObjectNode = require('./ObjectNode');

module.exports = class MrCrawler {
	constructor(schema) {
		this.headlessBrowser = new HeadlessBrowser();
		this.operations = [];

		this.prepare(schema);
	}

	prepare(schema) {
		for (var key in schema) {
      	if (schema.hasOwnProperty(key)) {
				if (typeof schema[key] == "object") {
					if(ObjectNode.isAction(key)) {
						this.operations.push(ObjectNode.getAction(key));
					}

					this.prepare(schema[key]);

				} else {					
					this.operations[this.operations.length - 1][key] = schema[key]
				}
        	}
   	}
	}

	read(callback, index = 0) {
		if(index < 1){
			this.exec(res => {
				callback(res, index);
			}, 0)

			this.read(callback, ++index)
		}
	}

	exec(cb, index) {
		this.operations[index].exec(res => {
			if(this.operations.length == parseInt(index + 1)){
				cb(res)
			} else {
				this.exec(cb, ++index);
			}
		});
	}
}

// hb.launch()
// .then(() => hb.open('http://editoraunicamp.com.br/produto_detalhe.asp?id=854'))
// .then(() => {

// 	const schema = new Schema(require('./schema.json'));
// 	// console.log(Object.keys(schema.template).length)

// 	hb.find(schema.template.properties[0])
// })
// .then(data => console.log(data.result.value))
// .then(() => hb.quit());
