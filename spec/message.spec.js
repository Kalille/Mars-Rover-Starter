const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if name type is NOT passed into constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name type required.'));
      });
    it("construstuctor sets a name", ()=>{
        let nameType = new Message('MODE_CHANGE');
        expect(nameType.name).toBe('MODE_CHANGE')
    });
    it('contains a commands array passed into the constructor as the 2nd argument',()=>{
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let testMessage = new Message('test message with two commands', commands)
        expect(Array.isArray(testMessage.commands)).toBe(true)
    })

});
