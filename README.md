Doggo Scraping
==============
Doggo is a little friend to build scraping scripts easier.

## How it Works?
The main approach under Doggo Scraping scripts is to abstract semantically(*and programmatically*) things you don't need to worry about everytime you decide to make a new one by providing a super-api(*ironic content alert*) of methods made of: a starter(**wakeUp**) with a built-in *ender*, an iterator or loop(**iterate**), a redirector(**goto**) and a DOM evaluable(**eval**). Except for the last one, all of them are **chainable promises**.

### wakeUp(url, callback(doggoInstance))
Lauches headless-chrome, calls **goto()**(since you have to work in a DOM's page anyway) and, after all promises inside the callback is resolved, orders doggo to **die()** (but he's just pretending...no, he's not!).

```javascript
    doggo.wakeUp('http://initialurl.com/', callback(doggoInstance));
```

### iterate(\'query-selector\', callback(iterationItem, index))
```javascript
    doggo.iterate('query-selector', callback(iterationItem, index));
```

### goto(\'http://urltogoto.com/')
```javascript
    doggoInHome.goto('http://urltogoto.com/');
```

### eval(\'query-selector\')
```javascript
    doggoInBooks.eval('query-selector');
    doggoInBooks.eval(element)
```

## Dependencies
This projecto runs over a [headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) instance (yes, you gonna need **59+ chrome version**). To initialize it and make use of some [DevTools Protocol API](https://chromedevtools.github.io/devtools-protocol/) utilities, we're using in this project [lighthouse's](https://developers.google.com/web/tools/lighthouse/) [chrome-launcher](https://www.npmjs.com/package/chrome-launcher). But, for DOM's handling, we choose to work with [cheerio](https://github.com/cheeriojs/cheerio), which implements jQuery's core to make powerfull evaluations.

## Instalation
    npm install doggo-scraping --save
    
## Hands On

## License

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
