const DoggoScraping = require('../DoggoScraping');
const doggo = new DoggoScraping();

doggo.wakeUp('https://github.com/OnetapInc/chromy', doggoAtHome => {
	// console.log(doggoAtHome)
	return doggoAtHome.goto('https://github.com/OnetapInc/chromy');

	// let categories = [];

	// return doggoInHome.iterate('.itens_menu a', (category, index) => {

	// 	let books = [];

	// 	return doggoInHome.goto(doggoInHome.url + category.attr('href'))
	// 	.then(doggoInCategory => {

	// 		return doggoInCategory.iterate('.caixa_produtos .box a',
	// 		(book, i) => {

	// 			return doggoInCategory.goto(doggoInHome.url + book.attr('href'))
	// 			.then(doggoInBooks => {

	// 				books.push({
	// 					url : book.attr('href'),
	// 					title : doggoInBooks.eval('.caixa_produtos_direita h2').text(),
	// 					image : doggoInBooks.eval('.caixa_produtos_esquerda_foto .foto_detalhe a').attr('href'),
	// 					cat: category.text()
	// 				});

	// 				return books;
	// 			});
	// 		});
	// 	})
	// 	.then(books => {
	// 		categories.push({
	// 			title : category.text(),
	// 			link : category.attr('href'),
	// 			books : {
	// 				length: books.length,
	// 				itens : books
	// 			}
	// 		});

	// 		console.log(categories[categories.length - 1])
	// 	});
	// });
});
