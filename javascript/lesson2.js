var fn1 = () => {

	console.log('fn1');
	return Promise.resolve(1);

}



var fn2 = () => new Promise(resolve => {

	console.log('fn2');

	setTimeout(() => resolve(2), 1000);

});



function promiseReduce(asyncFunctions, reduce, initialValue) {


	var accumulator = initialValue;

	var i = 0;



	if (asyncFunctions.length === 0) {


		return (new Promise((resolve) => { resolve(initialValue); }));


    	}



	function promises_call(current_promise, resolve) {

		current_promise.then(function(value) {

			accumulator = reduce(accumulator, value);

			i = i + 1;

			if (i < asyncFunctions.length) {

				promises_call(asyncFunctions[i](), resolve);

			}

			else {

				resolve(accumulator);

			}

		});

	}



	return (new Promise ((resolve) => { promises_call(asyncFunctions[0](), resolve); }));



}



promiseReduce([fn1, fn2], function (memo, value) { console.log('reduce'); return memo * value; }, 1)
.then(console.log);
