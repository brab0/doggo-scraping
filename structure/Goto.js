
module.exports = class Goto {
    constructor(headlessBrowser){
        this.url = "";
        this.headlessBrowser = headlessBrowser;
    }
    
    exec(cb = null) {        
        return this.headlessBrowser.open(this.url)
        .then(res => {
            return res;
        });
    }
}
