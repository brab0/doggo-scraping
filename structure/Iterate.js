module.exports = class Iterate {
    constructor(){
        this.in = [];
        this.index = 0;
    }    
    
    exec(cb){
        console.log('iterate: ', this.in)
        
        if(this.in.length == this.index){
            cb('done');
        } else {
            this.index++;
            console.log(this.index, this.in.length)
            this.exec(cb)
        }
    }
}
