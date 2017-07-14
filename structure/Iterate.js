module.exports = class Iterate {

    constructor(headlessBrowser) {
        this.in = "";
        this.headlessBrowser = headlessBrowser;
        this.counter = 0;
    }

    exec(cb = null) {
        this.headlessBrowser
            .find(this.in + '.length')
            .then(res => {                              
                if(parseInt(res.result.value - this.counter) > 0) {
                    cb(res.result.value);

                    this.counter++;

                    this.exec(cb)
                } else {
                    cb(null);
                }
            });
    }
}
