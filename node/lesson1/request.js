const http = require('http');
const readline = require('readline').createInterface({
	input:	process.stdin,
	output:	process.stdout
})

const responses = [];

var requests_type = 0;
var requests_number = 0;

readline.question('Requests type:', (input_value) => {
	requests_type = input_value;
	
	readline.question('Requests number:', (input_value) => {
		requests_number = input_value;
		readline.close();
		
		if (requests_type === 'p') {

			RequestsRunInParallel();

		}
		else {

			RequestsRunInSequence();

		}

	})
})

function RequestsRunInParallel() {

	var responses_counter = 0;

	for(var requests_counter = 0; requests_counter < requests_number; requests_counter++) {
		http.request({
			host: '127.0.0.1',
			port: 3000,
			path: '/'
		},
		function(response) {
			responses.push(response.statusCode);
			responses_counter = responses_counter + 1;

			if (responses_counter === requests_counter) {
				console.log(JSON.stringify(responses));
			}
		}).end();
	}
}

function RequestsRunInSequence() {

	var request_counter = 0;

	function requests_sequenser() {

		var request;

		request = http.request({
			host: '127.0.0.1',
			port: 3000,
			path: '/'
		}).end();

		request.on('response', (response) => {
			console.log(response.statusCode);

			request_counter = request_counter + 1;

			if (request_counter < requests_number) {
			
				console.log('Next request');
				requests_sequenser();			

			}
			else {

				return;
			}
		});

	}

	requests_sequenser();

}
