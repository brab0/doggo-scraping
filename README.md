Doggo Scraping
==============
Doggo is a little friend to help you make scraping scripts easier.

## How it Works?
The main approach under Doggo Scraping is to abstract semantically(*and programmatically*) things you don't need to worry about by providing a super-api(*ironic content alert*) of methods made of: a starter(**wakeUp**) with a built-in *ender*, a chainable iterator(**iterate**), a chainable redirector(**goto**) and a DOM evaluable(**eval**).

### Dependencies
This project runs over a [headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) instance (*you gonna need 59+ chrome version*). To initialize it and make use of some [DevTools Protocol API](https://chromedevtools.github.io/devtools-protocol/) utilities, we're using in this project [lighthouse's](https://developers.google.com/web/tools/lighthouse/) [chrome-launcher](https://www.npmjs.com/package/chrome-launcher). But, for the DOM's handling, we choose to work with [cheerio](https://github.com/cheeriojs/cheerio), which implements jQuery's core to make powerfull evaluations.

## API
### wakeUp(url, callback(doggoInstance))
A promise that internally lauches headless-chrome, calls `goto(url)`(*since you have to work in a DOM's page anyway*) and,
after returning from callback, orders doggo to `die()`(*but he's just pretending...no, he's not!*).

```javascript
    doggo.wakeUp('http://initialurl.com/', doggoInstance => {
        console.log(`Hello, Doggo! Your home now is ${doggoInstance.url}`);
    });
```
...or even:
```javascript
    doggo.wakeUp('http://initialurl.com/', doggoInstance => {
        const greeting = `Hello, Doggo! Your home now is ${doggoInstance.url}`;
        return greeting;
    })
    .then(greeting => console.log(greeting));
```

### goto('http://urltogoto.com/')

```javascript
    doggoInHome.goto('http://urltogoto.com/');
```

**OBS**: because `wakeUp()` method also calls `goto()`, this last one provides an instance of itself to the callback, which allow us to get the access needed to our methods.



### iterate(\'query-selector\', callback(iterationItem, index))
```javascript
    doggo.iterate('query-selector', callback(iterationItem, index));
```

### eval(\'query-selector\')
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
