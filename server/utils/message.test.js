var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {//this is a synchronous text so no need to call done
		var from = 'jen';
		var text = 'Some message';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from: from,
			text: text 
		});

	});
});