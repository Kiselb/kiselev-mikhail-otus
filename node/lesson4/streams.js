const stream = require('stream');

const readable = (function() {

	const stream_readable = new stream.Readable({ highWaterMark: 50, objectMode: false, read() {} });

	for(let i = 0; i < 10; i++) {
		if (!stream_readable.push((100 * Math.random()).toString())) {
			console.log("HighWaterMark reached");
		}
	}

	return stream_readable;
})();

const writable = (function() {

	const data = [];
	
	const stream_writable = new stream.Writable({
	
		write(chunk, encoding, callback) {
			console.log(chunk.toString());
			callback();
		}

	});

	return stream_writable;

})();

function wait(ms) {
	var start = new Date().getTime();
	var end = start;

	while(end < start + ms) {
		end = new Date().getTime();
	}
}
const transformable = (function() {

	const stream_transform = new stream.Transform({

		transform(chunk, encoding, callback) {

			wait(1000); // 

			this.push(((+chunk) + 1000).toString());
			callback();
		}
	});
	
	return stream_transform;

})();

readable.on('data', (data) => { 
	transformable.write(data);
});

transformable.on('data', (data) => {
	writable.write(data);
});

