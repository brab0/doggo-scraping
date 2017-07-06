
module.exports = class Goto {
    constructor(){
        this.url = "";    
    }
    
    exec(cb){
        console.log('goto: ', this.url)
        cb(this.url);
    }
}
