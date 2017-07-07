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
               //res.result.value
                if(parseInt(5 - this.counter) > 0) {
                   console.log('iterate: ', res.result.value, this.counter)

                  //   cb(this.counter);

                    this.counter++;

                    this.exec(cb)
                } else {
                    return null;
                }
            });
    }
}
