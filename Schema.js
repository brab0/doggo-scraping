const ObjectNode = require('./ObjectNode');

module.exports = class Schema {
   constructor(schema){
      this.set(schema);
   }

   set(schema){
      for (var property in schema) {
         if (obj.hasOwnProperty(property)) {
            if (typeof schema[property] == "object") {
               steps.push(new ObjectNode(schema[property]));

         		iterate(schema[property]);
            } else {
         		console.log(property + " " + schema[property] + "  " + Object.keys(schema).indexOf(property));
         	}
         }
      }
   }
}
