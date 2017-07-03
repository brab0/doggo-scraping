const HeadlessBrowser = require('./HeadlessBrowser');
const hb = new HeadlessBrowser();
const schema = require('./schema.json');

hb.launch()
.then(() => hb.open('http://editoraunicamp.com.br/produto_detalhe.asp?id=854'))
.then(() => {

	loadResponse()
	console.log(Object.keys(schema.template).length)

	hb.find(schema.template.properties[0])
})
.then(data => console.log(data.result.value))
.then(() => hb.quit());



// function iterate(obj) {
//     for (var property in obj) {
//         if (obj.hasOwnProperty(property)) {
//             if (typeof obj[property] == "object") {
// 				if(property == "properties"){
// 						console.log(	)
// 				}
//
// 				iterate(obj[property]);
// 			} else {
// 				console.log(property + " " + obj[property] + "  " + Object.keys(obj).indexOf(property));
// 			}
//         }
//     }
// }
