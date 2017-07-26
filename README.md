Doggo Scraping
==============
Doggo is a little friend to make the scraping scripts creating process simple.

## How it Works?
By now, Doggo has basically four command: **wakeUp**, **iterate**, **goto** and **eval**. All of them are **chainable promises** running over a [headless-chrome](https://developers.google.com/web/updates/2017/04/headless-chrome) instance (yes, you gonna need **59+ chrome version**). 
To initialize it and make use of some [DevTools Protocol API](https://chromedevtools.github.io/devtools-protocol/) utilities, we're using in this project [lighthouse's](https://developers.google.com/web/tools/lighthouse/) [chrome-launcher](https://www.npmjs.com/package/chrome-launcher) as dependency. But for DOM's handling, we choose to work with [cheerio](https://github.com/cheeriojs/cheerio), which implements the core of jQuery to make powerfull evaluations.

### wakeUp():
Lauches headless-chrome. Since this package is made specifically to scraping stuffs, it does make sence to start the application opening the base url. So, internally, when chrome is ready, the method calls the goto method and after everything is resolved, orders doggo to die (but he's just pretending...not)

    doggo.wakeUp('http://initialurl.com/', callbackFunction(doggoNewInstance));

### iterate():

    doggo.iterate('query-selector', callbackFunction(iterationItem, index));
    
### goto():

    doggoInHome.goto('http://urltogoto.com/');


### eval():
    doggoInBooks.eval('query-selector');
    doggoInBooks.eval(element)

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
