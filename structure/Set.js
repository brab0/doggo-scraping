module.exports = class Set {
    constructor(headlessBrowser){
        this.property = "";
        this.from = "";
        this.headlessBrowser = headlessBrowser;
    }

    exec(cb = null) {
        if(this.from != ""){
            this.headlessBrowser.find(this.from)
            .then(res => {
                console.log(res.result.value);
                cb(res.result.value)
            });
        } else {
            cb('new node')
        }  
    }
}
