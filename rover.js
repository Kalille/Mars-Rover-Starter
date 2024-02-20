const Message = require('./message.js');
const Command = require('./command.js');

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
// let rover3 = new Rover(93823);
// // console.log(`new rover: ${JSON.stringify(rover3)}`)
// let commands = [new Command('MOVE', 23423)];
// // console.log(`2nd log commands ${JSON.stringify(commands[0])},${JSON.stringify(commands[1])}`)
// let message = new Message('test message with two commands', commands);
// // console.log(` 3rd log ${JSON.stringify(message.commands.length)}`)
// rover3.receiveMessage(message)

   let rover = new Rover(100);
    let commands = [
       new Command('MOVE', 4321),
       new Command('STATUS_CHECK'),
       new Command('MODE_CHANGE', 'LOW_POWER'),
       new Command('MOVE', 3579),
       new Command('STATUS_CHECK')
    ];
    let message = new Message('TA power', commands);
    let response = rover.receiveMessage(message);
    console.log(JSON.stringify(response))
module.exports = Rover;