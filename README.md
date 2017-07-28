Doggo Scraping
==============
Doggo is a little friend to help you make scraping scripts a lot easier.

## How it Works?
The main approach under Doggo Scraping is to abstract semantically(*and programmatically*) things you don't need to worry about by providing a super-api(*ironic content alert*) of methods made of: a starter(**wakeUp**) with a built-in *ender*, an iterator(**iterate**), a redirector(**goto**) and a DOM evaluable(**eval**).

### Dependencies
This project runs over a [headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) instance (*you gonna need 59+ chrome version*). To initialize it and make use of some [DevTools Protocol API](https://chromedevtools.github.io/devtools-protocol/) utilities, we're using in this project [lighthouse's](https://developers.google.com/web/tools/lighthouse/) [chrome-launcher](https://www.npmjs.com/package/chrome-launcher). But, for the DOM's handling, we choose to work with [cheerio](https://github.com/cheeriojs/cheerio), which implements jQuery's core to make powerfull evaluations.

## Instalation
    $ npm install doggo-scraping --save

## API
### wakeUp(url, callback(doggoInstance)).then(function(){})
Method to initialyze the scraping block. Internally `lauches headless-chrome`, calls `goto(url)` method, execute a callback(where things happens) and after that, kill chrome instance ordering doggo to `die()`(*but he's just pretending...no, he's not!*).

```javascript
...
	doggo.wakeUp('http://home.com/', doggoAtHome => {  // instance of Doggo of this page context
	    // scraping script goes here
	    console.log(`Hello, Doggo! Your home now is ${doggoAtHome.url}`);
	});
```
...or even:
```javascript
...
	doggo.wakeUp('http://home.com/', doggoAtHome => {   // instance of Doggo of this page context
	    // scraping script goes here
	    return `Hello, Doggo! Your home now is ${doggoAtHome.url}`;
	})
	.then(greeting => console.log(greeting));
```

### goto(url).then(function(){})
Method to open a new page. Once a page is ready, it resolves a new instance of doggo with its methods (*as you just saw above*) according to the new DOM's context. Furthermore, persists the **url** param. 

```javascript
...
	return doggoAtHome.goto('http://beach.com/')
	.then(doggoAtBeach => {
	    // scraping script goes here
	    return `Hello, Doggo! Your home now is ${doggoAtBeach.url}`;
	})
	.then(greeting => console.log(greeting));
...
```
...or maybe a chain of them:
```javascript
...
	return doggoAtHome.goto('https://www.beach.com/')
	.then(doggoAtBeach => {
	    console.log(`Doggo is here: ${doggoAtBeach.url}`)
	    return doggoAtBeach.goto('http://pool.com/')
	})
	.then(doggoAtPool => console.log(`Now, doggo is here: ${doggoAtPool.url}`))
	.then(msg => console.log(`Doggo loves pool`));
...
```

### eval('selector')
Evaluates a selector (according to instance context) and returns a "jquery element".
```javascript
...
	let goodBoy = doggoAtHome.eval('.good-boy');
	console.log(goodBoy.attr('href'))
...
```

### iterate('selector', callback(item, index)).then(function(){})
Our iterator method (also a Promise), receives a selector to iterate over it, returning on each iteration, item by item as "jQuery element" (internally calls `eval('selector')`).

```javascript
...
	return doggo.iterate('.doggo-class a', (item, index) => {
	    console.log(index, item.text())
	}).then(() => console.log("That's it!"));
...
```

**OBS**: As you may noticed in the isolated pieces of code above and will see at the **Hands On** section, the promises `goto()` and `iterate()` always return itselves. That's because we need promises respect a "hierarchical" behaviour (resolve to continue).
    
## Hands On
In the fallowing script, we're going to get all books from the site 'http://editoraunicamp.com.br/' and set them to their respective categories. To get there, we will:
- `goto()` the page where the categories are;
- `iterate()` over the category items;
- `goto()` these categories pages to see our books;
- `iterate()` over all books elements;
- `goto()` each book's details page;
- handle the elements(`eval()`) and keep these books and categories until the last one;
- finally, we show up(`console.log()`) the results kepts;

```javascript

	// Since Doggo Scraping is a class, we need to require it and instantiate a new object
	
    	const DoggoScraping = require('doggo-scraping');
	const doggo = new DoggoScraping();
	
	// simple counter to totalize books at the end
	let count = 0;

	/*
	*  Next, we're using our object to initialize a scraping script block.
	*  At this moment, the object doggo cannot do much. We're gonna initialize it
	*  to have access to the other methods exposed at doggoAtHome	
	*/
	
	doggo.wakeUp('http://editoraunicamp.com.br/', doggoAtHome => {
		
	    // we're gonna keep categories to show at the end
		
	    let categories = [];
		
	    /* 
	    *  Ok, as we also set it to go to a valid url at wakeUp(), 
	    *  now we're literally on it. So, let's iterate over '.itens_menu a'
	    *  to get the categories attributes we need.
	    *  OBS: do not forget to return. As we already said, returning the promises
	    *  will ensure the right execution's sequence.
	    */
		
	    return doggoAtHome.iterate('.itens_menu a', (category, index) => {			        
			
	    	/* 
		* Now we've got a category element, we can follow the links to explore(goto()) their items
	    	* OBS: another promise's return(do not forget).
	    	*/
			
	    	return doggoAtHome.goto(doggoAtHome.url + category.attr('href'))
	    	.then(doggoAtCategory => {
			
		    // we're gonna keep books to push into categories

		    let books = [];
			
	      	    /* 
		    *  Now, I'm in a category's page and can see every book inside it. Let's iterate!
	      	    *  OBS: another ret...ok, you got it, right?
		    */
			
	      	    return doggoAtCategory.iterate('.caixa_produtos .box a', (book, i) => {
				
			/* 
			*  We are almost there! But, the item we got in iteration
			*  doesn't have enough information. They are in another page.
			*  Let's go there!
			*/

			return doggoAtCategory.goto(doggoAtHome.url + book.attr('href'))
			.then(doggoAtBooks => {
					
			    /*
			    *  There it is! All we need is to push what we got into an array.
			    *  Note below that the element book, provided by iterate, already is a jQuery element.
			    *  That's why we can operate jquery methods such book.attr('href'). 
			    *  But we still need keep element that aren't. So, as you can see, 
			    *  to get title and image src, we're gonna use eval() method in the page's
			    *  context these elements are, which is instatiated at doggoAtBooks.
			    */

		    	    books.push({
		        	url : book.attr('href'),
				title : doggoAtBooks.eval('.caixa_produtos_direita h2').text(),
				image : doggoAtHome.url + doggoAtBooks.eval('.caixa_produtos_esquerda_foto .foto_detalhe a').attr('href')
		    	    });			    			    
		        });
	    	    })
		    .then(() => {		    	
			
			/*  
			*  let's return 'books' to the promise above,
			*  where we're gonna set it as a category's attribute
			*/
			
			return books;
		    });
		})
		.then(books => {
		
		    /*
		    *  Now we have books and the category of this iteration,
		    *  we push it into an array
		    */
		    categories.push({
			title : category.text(),
			link : category.attr('href'),
			books : {
			    length: books.length,
		    	    itens : books
		        }
		    });
		    
		    // let's print the last category kept to show the progress
		    console.log(categories[categories.length - 1])
		    
		    // we want to show the total os books as well
		    count += books.length;	    	    
	        });
	    })
	    .then(() => {
	    	
		/*  
		*  returns our 'categories' to be resolved 
		*  at the wakeUp end showing the totalizers
		*/
		
	    	return categories;
	    });
	})
	.then(categories => {
	    //  totalizers
	    console.log(`--------------------------------`)
	    console.log(`Total Categories: ${categories.length}`)
	    console.log(`Total Books: ${count}`)
	    console.log(`--------------------------------`)
	});
```

## That's all folks!
This package isn't mature enough and has a long way with many possibilities to go.
If you have any suggestion or found a bug, let me know!

<img src="https://user-images.githubusercontent.com/850087/28640180-4f369856-7221-11e7-856d-7cc5e3b4739e.jpg" width="100%">

## License
```
MIT License

Copyright (c) 2017 Rodrigo Brabo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
