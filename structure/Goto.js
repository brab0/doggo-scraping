"use strict"

module.exports = class Goto {    

    constructor(headlessBrowser){
        this.url = "";
        this.headlessBrowser = headlessBrowser;
    }

    *exec(cb = null) {
        var patt = new RegExp("://");
        
        if(!patt.test(this.url)){
            this.headlessBrowser.find(this.url)
            .then(res => {
                this.url = res.result.value;

                if(!patt.test(this.url)){
                    this.headlessBrowser.find('window.location.href')
                    .then(res => {
                        this.headlessBrowser.open(res.result.value + this.url)
                        .then(res => {
                            console.log(res.result.value + this.url);
                            yield cb(res);
                        });
                    });
                } else {
                    this.headlessBrowser.open(this.url)
                    .then(res => {
                        console.log(this.url);
                        yield cb(res);
                    });
                }
            });
        } else {        
            this.headlessBrowser.open(this.url)
            .then(res => {
                console.log(this.url);
                yield cb(res);
            });
        }        
    }
}
