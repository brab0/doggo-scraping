const Goto = require('./structure/Goto');
const Iterate = require('./structure/Iterate');
const Set = require('./structure/Set');

module.exports = class Operation{    
	
	constructor(key){		 
		this.getInstance(key)
	}

	getInstance(key) {
		switch(key) {
			case 'goto':
				return new Goto();
			case 'iterate':
				return new Iterate();
			case 'set':
				return new Set();
			default:
				return false;
		}
	}

    static isValid(key) {		
		switch(key) {
			case 'goto':
				return true;
			case 'iterate':
				return true;
			case 'set':
				return true;			
			default:
				return false;
		}
	}

	static setProperty(action, property, value){	
		let actionKeys = Object.keys(action);

        const index = actionKeys.map(function(p){
            return p;
        }).indexOf(property);

		if(index > -1){			
			return value;
		}			
		else{
			throw new Error('property not found');		
		}			
    }
}
