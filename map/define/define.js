steal('can/util', 'can/map/attributes', 'can/util/string/classize.js',function (can) {
	var classize = can.classize,
		proto = can.Map.prototype,
		oldSet = proto.__set;
	proto.__set = function (prop, value, current, success, error) {
		//!steal-remove-start
		var asyncTimer;
		//!steal-remove-end
		
		// check if there's a setter
		var errorCallback = function (errors) {
				//!steal-remove-start
				clearTimeout(asyncTimer);
				//!steal-remove-end
				
				var stub = error && error.call(self, errors);
				// if 'validations' is on the page it will trigger
				// the error itself and we dont want to trigger
				// the event twice. :)
				if (stub !== false) {
					can.trigger(self, 'error', [
						prop,
						errors
					], true);
				}
				return false;
			}, 
			self = this;
			
		
			
		// if we have a setter
		if (this.define && this.define[prop] && this.define[prop].set ) {
			// call the setter, if returned value is undefined,
			// this means the setter is async so we
			// do not call update property and return right away
			can.batch.start();
			var setterCalled = false;
			value = this.define[prop].set.call(this, value, function (value) {
				oldSet.call(self, prop, value, current, success, errorCallback);
				setterCalled = true;
				//!steal-remove-start
				clearTimeout(asyncTimer);
				//!steal-remove-end
			}, errorCallback);
			
			
			if(value === undefined && !setterCalled) {
				//!steal-remove-start
				asyncTimer = setTimeout(function(){
					can.dev.warn('can/map/setter.js: Setter ' + prop+' did not return a value or call the setter callback.');
				},can.dev.warnTimeout);
				can.batch.stop();
				//!steal-remove-end
				return;
			} else {
				if(!setterCalled) {
					oldSet.call(self, prop, value, current, success, errorCallback);
				}
				can.batch.stop();
				return this;
			}
			
		} else {
			oldSet.call(self, prop, value, current, success, errorCallback);	
		}
		
		return this;
	};
	
	
	var oldType = proto.__type;
	proto.__type = function(value, prop){
		var def = this.define && this.define[prop],
			type ;
		if(def) {
			if(def.type) {
				return def.type.call(this, value, prop);
			} else if(def.set) {
				return value;
			}
		} 
		return oldType.call(value, prop);
	};
	
	var oldRemove = proto._remove;
	proto._remove = function(prop, current){
		var remove = this.define && this.define[prop] && this.define[prop].remove,
			res;
		if(remove ) {
			can.batch.start();
			res = remove.call(this, current);
			
			if(res === false) {
				can.batch.stop();
				return;
			} else {
				
				res = oldRemove.call(this, prop, current);
				can.batch.stop();
				return res;
			}
		} 
		return oldRemove.call(this, prop, current);
	};
	
	return can.Map;
});
