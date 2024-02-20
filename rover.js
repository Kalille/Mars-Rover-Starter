
class Rover {
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110
   }
   // Write code here!
   receiveMessage(message) {
      let results = [];
   
      for (let command of message.commands) {
         let result;
   
         if (command.commandType === 'STATUS_CHECK') {
            result = { 
               completed: true, 
               roverStatus: { 
                  mode: this.mode, 
                  position: this.position, 
                  generatorWatts: this.generatorWatts 
               } 
            };
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            result = { completed: true };
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'NORMAL') {
               this.position = command.value;
               result = { completed: true };
            } else {
               result = { completed: false, message: 'Cannot move while in LOW_POWER mode' };
            }
         } else {
            result = { completed: false, message: 'Unknown command type' };
         }
   
         results.push(result);
      }
   
      return { message: message.name, results: results };
   }
   
}

module.exports = Rover;