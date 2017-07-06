const Goto = require('./structure/Goto');
const Iterate = require('./structure/Iterate');
const Set = require('./structure/Set');

module.exports = class Operation {		

    static isAction(key) {		
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

	static isProperty(key, lastOperation) {
		return Object.keys(lastOperation).some(op => op === key);
	}

	static setAction(key, headlessBrowser) {
		switch(key) {
			case 'goto':
				return new Goto(headlessBrowser);
			case 'iterate':
				return new Iterate(headlessBrowser);
			case 'set':
				return new Set(headlessBrowser);
			default:
				return false;
		}
	}
}
