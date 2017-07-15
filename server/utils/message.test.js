var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');


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

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'jen';
		var latitude = 15;
		var longitude = 22;
		var url = 'https://www.google.com/maps?q=15,22';
		var message = generateLocationMessage(from, latitude, longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			url
		});

	});
});