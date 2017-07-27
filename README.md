Doggo Scraping
==============
Doggo is a little friend to help you make scraping scripts a lot easier.

## How it Works?
The main approach under Doggo Scraping is to abstract semantically(*and programmatically*) things you don't need to worry about by providing a super-api(*ironic content alert*) of methods made of: a starter(**wakeUp**) with a built-in *ender*, a chainable iterator(**iterate**), a chainable redirector(**goto**) and a DOM evaluable(**eval**).

### Dependencies
This project runs over a [headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) instance (*you gonna need 59+ chrome version*). To initialize it and make use of some [DevTools Protocol API](https://chromedevtools.github.io/devtools-protocol/) utilities, we're using in this project [lighthouse's](https://developers.google.com/web/tools/lighthouse/) [chrome-launcher](https://www.npmjs.com/package/chrome-launcher). But, for the DOM's handling, we choose to work with [cheerio](https://github.com/cheeriojs/cheerio), which implements jQuery's core to make powerfull evaluations.

## API
### wakeUp(url, callback(doggoInstance))
The *promise* to initialyze the scraping block. Internally `lauches headless-chrome`, calls `goto(url)`(*since you have to work in a DOM's page anyway*) and then, after the callback returns, orders doggo to `die()`(*but he's just pretending...no, he's not!*).

```javascript
    doggo.wakeUp('http://home.com/', doggoAtHome => {
        // scraping script goes here
        console.log(`Hello, Doggo! Your home now is ${doggoAtHome.url}`);
    });
```
...or even:

```javascript
    doggo.wakeUp('http://home.com/', doggoAtHome => {
        // scraping script goes here
        return `Hello, Doggo! Your home now is ${doggoAtHome.url}`;
    })
    .then(greeting => console.log(greeting));
```

### goto(url)
Method(Promise) chainable to open a new page. Once a page is ready, it resolves a new instance of doggo with its methods according to the new DOM's context and/or iteration. Furthermore, persists the **url** param. 
**OBS:** Since `wakeUp()` callback receive an instance of doggo provided by a `goto()` method, you gonna see the next example is pretty much the same from above, except for the `then()`:

```javascript
    return doggoAtHome.goto('http://beach.com/')
    .then(doggoAtBeach => {
        // scraping script goes here
        return `Hello, Doggo! Your home now is ${doggoAtBeach.url}`;
    })
    .then(greeting => console.log(greeting));
```
...or maybe a chain of them:

```javascript
    return doggoAtHome.goto('https://www.beach.com/')
	   .then(doggoAtBeach => doggoAtBeach.goto('https://www.garden.com/'))
    .then(doggoAtGarden => doggoAtGarden.goto('http://pool.com/'))
    .then(doggoAtPool => `Doggo loves pool`)
   	.then(msg => console.log(msg));
```

### iterate('query-selector', callback(iterationItem, index))
```javascript
    doggo.iterate('.doggo-class a', (iterationItem, index) => {
         
    });
```

### eval('query-selector')
```javascript
    doggoInBooks.eval('query-selector');
    doggoInBooks.eval(element)
```

## Instalation
    $ npm install doggo-scraping --save
    
## Hands On

### Scraping 01:

```javascript
    const DoggoScraping = require('../DoggoScraping');
    const doggo = new DoggoScraping();

    doggo.wakeUp('http://editoraunicamp.com.br/', doggoInHome => {

        let categories = [];

        return doggoInHome.iterate('.itens_menu a', (category, index) => {

            let books = [];

            return doggoInHome.goto(doggoInHome.url + category.attr('href'))
            .then(doggoInCategory => {

                return doggoInCategory.iterate('.caixa_produtos .box a',
                (book, i) => {

                    return doggoInCategory.goto(doggoInHome.url + book.attr('href'))
                    .then(doggoInBooks => {
                        books.push({
                            url : book.attr('href'),
                            title : doggoInBooks.eval('.caixa_produtos_direita h2').text(),
                            image : doggoInBooks.eval('.caixa_produtos_esquerda_foto .foto_detalhe a').attr('href'),
                            cat: category.text()
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
        });
    });
});
```

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
