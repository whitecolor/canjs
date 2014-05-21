steal('can/compute', 'objectobserve', function(compute){

can.compute.watch = function(object, property){
		var watchedCompute = can.compute(object[property]);
		console.log(Object.observe);
		Object.observe(object, function(changes){
			can.each(changes, function(change){
				if(change.name === property){
					return watchedCompute(change.object[property]);
				}
			});
		})

		return watchedCompute;
};


});