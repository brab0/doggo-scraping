module.exports = class Set {
    constructor(headlessBrowser){
        this.property = "";
        this.from = "";
        this.headlessBrowser = headlessBrowser;
    }

    exec(cb = null) {
        this.headlessBrowser.find(this.from)
        .then(res => {
           console.log("set: " + this.property + " - " + this.from)
           return res.result.value
        });
    }
}
