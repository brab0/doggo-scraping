const DoggoScraping = require('./DoggoScraping');
const doggo = new DoggoScraping();

let count = 0;

doggo.run('http://editoraunicamp.com.br/')
.then(doggo => {

	let categories = [];

	return doggo.iterate('.itens_menu a', (category, index) => {

		let books = [];

		return doggo.goto(doggo.baseUrl + category.attr('href'))
		.then(doggo => {

			return doggo.iterate('.caixa_produtos .box a',
			(book, i) => {

				return doggo.goto(doggo.baseUrl + book.attr('href'))
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
		});
	});
})
.then(() => {
	console.log(count)
	doggo.die()
});
