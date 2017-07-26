const DoggoScraping = require('./DoggoScraping');
const doggo = new DoggoScraping();

let count = 0;

doggo.wakeUp('http://editoraunicamp.com.br/', doggoInHome => {

	let categories = [];

	return doggoInHome.iterate('.itens_menu a', (category, index) => {

		let books = [];

		return doggoInHome.goto(doggoInHome.url + category.attr('href'))
		.then(doggoInCategory => {

			return doggoInCategory.iterate('.caixa_produtos .box a',
			(book, i) => {

				return doggoInCategory.goto(doggoInCategory.url + book.attr('href'))
				.then(doggo => {

					books.push({
						url : book.attr('href'),
						title : doggo.find('.caixa_produtos_direita h2').text(),
						image : doggo.find('.caixa_produtos_esquerda_foto .foto_detalhe a').attr('href')
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
	console.log(categories.length + ' categorias lidas.')
	console.log(count + ' livros lidos.')
});
