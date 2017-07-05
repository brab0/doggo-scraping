const ObjectNode = require('./ObjectNode');

module.exports = class Schema {
    constructor(schema){
        this.operations = [];
        this.load(schema);
        console.log(this.operations);
    }

    // execOperations(callback, index = 0) {			
	// 	if(index < this.actions.length){
	// 		callback(this.actions[index], index);
	// 		this.read(callback, ++index)
	// 	}
	// }

	load(schema) {
		for (var key in schema) {
         	if (schema.hasOwnProperty(key)) {
				if (typeof schema[key] == "object") {					
                    this.setOperations(ObjectNode.setAction(key));                              
					this.load(schema[key]);                    
				} else {                    
                    ObjectNode.setProperty(this.getLastOperation(), key, schema[key]);
				}
        	}
      	}        
	}
    
    setOperations(operation){        
        if(operation) {
            this.operations.push(operation)
        }
    }

    getLastOperation(){
        return this.operations[this.operations.length - 1];
    }

    updateLastOperation(){
        return this.operations[this.operations.length - 1];
    }
}
