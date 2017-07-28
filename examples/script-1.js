const DoggoScraping = require('../doggo-scraping');
const doggo = new DoggoScraping();

let count = 0;

doggo.wakeUp('http://editoraunicamp.com.br/', doggoInHome => {

	let categories = [];

	return doggoInHome.iterate('.itens_menu a', (category, index) => {
		
		let books = [];

		return doggoInHome.goto(doggoInHome.url + category.attr('href'))
		.then(doggoInCategory => {

			return doggoInCategory.iterate('.caixa_produtos .box a', (book, i) => {
				
				return doggoInCategory.goto(doggoInHome.url + book.attr('href'))
				.then(doggoInBooks => {

					books.push({
						url : book.attr('href'),
						title : doggoInBooks.eval('.caixa_produtos_direita h2').text(),
						image : doggoInHome.url + doggoInBooks.eval('.caixa_produtos_esquerda_foto .foto_detalhe a').attr('href')
					});

					return books;
				});
			});
		})
		.then(books => {
			categories.push({
				title : category.text(),
				link : category.attr('href'),
				books : {
					length: books.length,
					itens : books
				}
			});

			console.log(categories[categories.length - 1])

			count += books.length;

			return categories;
		});
	});
})
.then(categories => {
	console.log(`Total Categories: ${categories.length}`)
	console.log(`Total Books: ${doggoAtPool.count}`)
});