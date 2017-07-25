const MrCrawler = require('./MrCrawler');

const crawler = new MrCrawler();

const SCHEMA = {
	categories : {
		element : "",
		title : ".itens_menu a",
		link : ".itens_menu a",
	},
	books : {
		element : ".caixa_produtos .box a",
		title : ".caixa_produtos_direita h2",
		image : ".caixa_produtos_esquerda_foto .foto_detalhe a",
		author : ".caixa_produtos_direita p:nth-child(0)'"
	}
}

let categories = [];
const baseUrl = "http://editoraunicamp.com.br/";

crawler.go(baseUrl)
.then(() => {
	crawler.iterate('.itens_menu a', (category, index) => {
		const catLink = category.attr('href');

		categories.push({
			title : category.text(),
			link : catLink,
			books : crawler.goto(baseUrl + catLink)
			.then(() => {
				let books = [];

				return crawler.iterate('.caixa_produtos .box a', (book, i) => {
					console.log(i, book.attr('href'))
					books.push(book.attr('href'));
					// crawler.evaluate(SCHEMA.books.link)
					// .then(url => crawler.goto(url))
					// .then(() => getBookDetails())
					// .then(bookDetails => bookDetails);
				})
				.then(() => books)
			})
		});
	})
	.then(() => console.log(categories));
});

function getBookDetails(){
	const details = [
		crawler.evaluate(SCHEMA.books.title),
		crawler.evaluate(SCHEMA.books.image),
		crawler.evaluate(SCHEMA.books.author)
	];

	return Promise.all(details)
	.then(detail => {
		return {
			title : detail[0],
			image : detail[1],
			author : detail[2]
		}
	});
}
