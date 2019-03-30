var sum = (function () {

	"use strict"

	var run_sum;
	run_sum = 0;

	function fx_run_sum(a) {
        
		if (arguments.length === 0) {
			console.log(run_sum);
			run_sum = 0;
		}
		else {
			if (typeof a === 'number') {
				run_sum = run_sum + a;
				return fx_run_sum;
            		}
		}
	}

	return fx_run_sum;

})();
