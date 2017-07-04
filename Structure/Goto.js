module.exports = class Goto {
   constructor(goto){
      this.url = goto.url;
      this.action = goto.action;
   }

   execAction(params = null){
      this.action(params);
   }
}
