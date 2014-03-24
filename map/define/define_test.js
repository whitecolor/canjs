
steal("can/map/define", "can/test", function () {
	
	module('can/map/define');
	
	// remove, type, default
	test('basics setter', function () {
		var Defined = can.Map.extend({
			define: {
				prop: {
					set: function(newVal){
						return "foo"+newVal;
					}
				}
			}
		});
		
		var def = new Defined();
		def.attr("prop","bar")
		
		equal( def.attr("prop"), "foobar", "setter works" );
		
		var Defined = can.Map.extend({
			define: {
				prop: {
					set: function(newVal, setter){
						setter("foo"+newVal);
					}
				}
			}
		});
		
		var def = new Defined();
		def.attr("prop","bar");
		
		equal( def.attr("prop"), "foobar", "setter callback works" );
		
		
		var Defined = can.Map.extend({
			define: {
				prop: {
					set: function(newVal){
						newVal.prop = true;
						return newVal;
					}
				}
			}
		});
		
		var def = new Defined(),
			obj = {};
		def.attr("prop",obj);
		
		equal(def.attr("prop"), obj, "property value is the same object");
		
		ok(def.attr("prop").prop, "property value is modified");
		
	});
	
	test("basics remove", function(){
		var ViewModel = can.Map.extend({
			define:{
				makeId: {
					remove: function(){
						this.removeAttr("models")
					}
				},
				models: {
					remove: function(){
						this.removeAttr("modelId")
					}
				},
				modelId: {
					remove: function(){
						this.removeAttr("years")
					}
				},
				years: {
					remove: function(){
						this.removeAttr("year")
					}
				}
			}
		});
		
		var mmy = new ViewModel({
			makes: [{id: 1}],
			makeId: 1,
			models: [{id: 2}],
			modelId: 2,
			years: [2010],
			year: 2010
		});
		
		var events = ["year","years","modelId","models","makeId"],
			eventCount = 0,
			batchNum;
		mmy.bind("change", function(ev, attr){
			if(batchNum === undefined) {
				batchNum = ev.batchNum;
			}
			equal(attr, events[eventCount++], "got correct attribute");
			ok(ev.batchNum && ev.batchNum === batchNum, "batched");
		});
		
		mmy.removeAttr("makeId")
		
	});
	
	
	
	
});