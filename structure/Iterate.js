module.exports = class Iterate {
    constructor(){
        this.in = "";
        this.list = [];
        this.index = 0;
    }

    exec(cb){
      this.in = []
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
