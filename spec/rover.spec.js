const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it('constructor sets position and default values for mode and generatorWatts',function(){
    let rover1 = new Rover(3);
    expect(rover1.position).toBe(3);
    expect(rover1.mode).toBe("NORMAL");
    expect(rover1.generatorWatts).toBe(110)
  });
   it('response returned by receiveMessage contains the name of the message', function(){
     let rover2 = new Rover(93832)
     let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
     let message = new Message('test message with two commands', commands);
     let response = rover2.receiveMessage(message)
    expect(response.message).toBe('test message with two commands')
   });
   it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let rover3 = new Rover(93823);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('test message with two commands', commands);
    let response = rover3.receiveMessage(message);
    expect(response.results.length).toBe(2)
   });
   it("responds correctly to the status check command", ()=>{
    let rover4 = new Rover(12345);
    let command = new Command("STATUS_CHECK");
    let message = new Message("testing check status command", [command])
    let response = rover4.receiveMessage(message);
    expect(response).toEqual({message: "testing check status command", results: [{ completed: true, roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 12345 } }]})
   });
   it("responds correctly to the mode change command", function(){
    let rover5 = new Rover(23456);
    let command = new Command("MODE_CHANGE", "LOW_POWER");
    let message = new Message("testing mode change", [command])
    let response = rover5.receiveMessage(message)
    expect(response).toEqual({
      message: "testing mode change",
      results: [{
          completed: true
      }]
  });
    expect(rover5.mode).toBe("LOW_POWER")
   });
   it("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let rover6 = new Rover(34566);
    rover6.mode = "LOW_POWER"
    let command = new Command("MOVE", 12345);
    let message = new Message("testing move command in Low power mode", [command]);
    let response = rover6.receiveMessage(message)
    expect(response).toEqual({message: "testing move command in Low power mode", results: [{ completed: false, message: 'Cannot move while in LOW_POWER mode' }]})
   });
   it("responds with the position for the move command", function(){
    let rover7 = new Rover(54321);
    let command = new Command("MOVE", 12345);
    let message = new Message("testing move command in Low power mode", [command]);
    let response = rover7.receiveMessage(message);
    expect(response).toEqual({message: "testing move command in Low power mode", results: [{completed: true}]})
    expect(rover7.position).toBe(12345)

   })
  // 7 tests here!

});
