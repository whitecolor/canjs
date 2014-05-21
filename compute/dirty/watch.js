steal('can/compute', 'observe-js', function(compute){

compute.watch = function(object, property){
	var observer = new PathObserver(object, property);
	var watchedCompute = can.compute(object[property]);
	observer.open(function(newVal, oldVal){
		return watchedCompute(newVal);
	});

	return watchedCompute;
};

});