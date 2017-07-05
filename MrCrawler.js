const HeadlessBrowser = require('./HeadlessBrowser');
const Schema = require('./Schema');

module.exports = class MrCrawler {
	constructor(schema) {
		this.headlessBrowser = new HeadlessBrowser();
		this.objectNodes = [];				
		this.schema = new Schema(schema);
	}

	read(callback, index = 0) {			
		if(index < 1){
			callback(index, index);
			this.read(callback, ++index)
		}
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
