const HeadlessBrowser = require('./HeadlessBrowser');
const hb = new HeadlessBrowser();

hb.launch()
.then(open => open('http://editoraunicamp.com.br/produto_detalhe.asp?id=854'))
.then(find => find("document.querySelector('.caixa_produtos_direita h2').textContent"))
.then(data => console.log(data));
