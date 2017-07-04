module.exports = class ObjectNode {
   constructor(objNode){
      // {
      //    "goto" : {
      //       "url" : "http://editoraunicamp.com.br/",
      //       "iterate" : [Object]
      //    }
      // }
      this.action = step.action;
      this.attrs = step.attrs;
   }



   execute(){
      return new Promise(resolve, reject){
         
         this.action(params);
      }
   }
}
