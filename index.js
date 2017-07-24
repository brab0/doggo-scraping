const MrCrawler = require('./MrCrawler');

const crawler = new MrCrawler();

const SCHEMA = {
	categories : {
		element : "document.querySelectorAll('.itens_menu a')",
		title : "document.querySelectorAll('.itens_menu a').textContent",
		link : "document.querySelectorAll('.itens_menu a').getAttribute('href')",
	},
	books : {
		element : "document.querySelectorAll('.caixa_produtos .box a')",
		title : "document.querySelector('.caixa_produtos_direita h2').textContent",
		image : "document.querySelector('.caixa_produtos_esquerda_foto .foto_detalhe a').getAttribute('href')",
		author : "document.querySelector('.caixa_produtos_direita p:nth-child(0)').textContent"
	}
}

let categories = [];

crawler.go("http://editoraunicamp.com.br/")
.then(() => setBooksByCategory());

function setBooksByCategory(){
	return crawler.iterate(SCHEMA.categories.element, itemCategory => {
		console.log(itemCategory)
		return getCategoryDetails()
		.then(category => {
			categories.push({
				title : category.title,
				link : category.link,
				books : getBooks(category)
			});
		});
	});
}

function getCategoryDetails(){
	const details = [
		crawler.evaluate(SCHEMA.categories.title),
		crawler.evaluate(SCHEMA.categories.link)
	];

	return Promise.all(details)
	.then(detail => {
		return {
			title : detail[0],
			link : detail[1]
		}
	});
}

function getBooks(category){
	return crawler.evaluate(category.link)
	.then(url => crawler.navigate(url))
	.then(() => {
		crawler.iterate(SCHEMA.books.element, book => {
			crawler.evaluate(SCHEMA.books.link)
			.then(url => crawler.navigate(url))
			.then(() => getBookDetails())
			.then(bookDetails => bookDetails);
		});
	});
}

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
