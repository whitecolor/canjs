steal('can', 'observejs', function(can){

can.compute.watch = function(object, property){
		var observer = new PathObserver(object, property);
		var watchedCompute = can.compute(object[property], {
			get: function(){
				observer.deliver();
				return observer.value_;
			},
			set: function(newVal){
				observer.setValue(newVal);
			}
		});
		observer.open(function(newVal){
			watchedCompute(newVal);
		});

		return watchedCompute;
	}

can.Map.watch = function(object){
	var observer = new ObjectObserver(object);
	var watchedMap = new can.Map(object);
	observer.open(function(added, removed, changed){

		Object.keys(added).forEach(function(property){
			watchedMap.attr(property, changed[property]);
		});

		Object.keys(removed).forEach(function(property){
			watchedMap.removeAttr(property);
		});

		Object.keys(changed).forEach(function(property){
			watchedMap.attr(property, changed[property]);
		});
	});

	return watchedMap;
}

can.List.watch = function(arr){
	var observer = new ArrayObserver(arr);
	var watchedArray = new can.List(arr);
	observer.open(function(splices){
		val = observer.value_;
		splices.forEach(function(s){
			var args = [s.index, s.removed.length].concat(arr.slice(s.index, s.addedCount));
			can.List.prototype.splice.apply(watchedArray, args);
		});
	});

	return watchedArray;
}


});

