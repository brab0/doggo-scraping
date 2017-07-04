const HeadlessBrowser = require('./HeadlessBrowser');
const hb = new HeadlessBrowser();
const Schema = require('./schema.js');

hb.launch()
.then(() => hb.open('http://editoraunicamp.com.br/produto_detalhe.asp?id=854'))
.then(() => {

	const schema = new Schema(require('./schema.json'));
	// console.log(Object.keys(schema.template).length)

	hb.find(schema.template.properties[0])
})
.then(data => console.log(data.result.value))
.then(() => hb.quit());
