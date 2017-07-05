const MrCrawler = require('./MrCrawler.js');
const schema = require('./schema.json');

const crawler = new MrCrawler(schema);

crawler.read(function(res, i){	
	// console.log(res, i)
	// res.exec();
});
