module.exports = class Iterate {
    constructor(headlessBrowser) {
        this.in = "";    
        this.headlessBrowser = headlessBrowser;
        this.counter = 0;
    }

    exec(cb = null) {      
        return this.headlessBrowser
            .find(this.in + '.length')
            .then(res => {
                // console.log(res.result.value, this.counter)
                if(res.result.value - this.counter > 0) {                
                    this.counter++;

                    cb(this.counter);

                    this.exec(cb)
                } else {
                    cb(null);
                }                                
            });
    }
}
