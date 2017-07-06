module.exports = class Set {
    constructor(headlessBrowser){
        this.property = "";
        this.from = "";
        this.headlessBrowser = headlessBrowser;
    }
    
    exec(cb = null) {
        // console.log(this.from)
        this.headlessBrowser.find(this.from)
        .then(res => cb(res.result.value));
    }
}
