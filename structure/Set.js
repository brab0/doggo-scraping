module.exports = class Set {
    constructor(){
        this.property = "";
        this.from = "";
    }
    
    exec(){
        console.log('set: ', { property : this.property, from : this.from })
        return { property : this.property, from : this.from };
    }
}
