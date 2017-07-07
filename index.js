const MrCrawler = require('./MrCrawler.js');
const schema = require('./schema.json');

const crawler = new MrCrawler(schema);

crawler.read((res, i) => {
	// console.log(res, i)
});
