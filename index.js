const DoggoScraping = require('./DoggoScraping');
const doggo = new DoggoScraping();

const baseUrl = "http://editoraunicamp.com.br/";

doggo.run(baseUrl)
.then(sniffer => {
	
	let categories = [];

	sniffer.iterate('.itens_menu a', (category, index) => {
		
		categories.push({
			title : category.text(),
			link : category.attr('href'),
			books : []
		})

		console.log(index, category.text())

		return sniffer.goto(baseUrl + category.attr('href'))
		.then(sniffer => {

			return sniffer.iterate('.caixa_produtos .box a', (book, i) => {
				
				return sniffer.goto(baseUrl + book.attr('href'))
				.then(sniffer => {
					let newBook = {
						url : book.attr('href'),
						title : sniffer.find('.caixa_produtos_direita h2').text(),
						image : sniffer.find('.caixa_produtos_esquerda_foto .foto_detalhe a').attr('href')
					};

					console.log(newBook)

					categories[categories.length - 1].books.push(newBook);						
				});
			});
		});		
	});
});