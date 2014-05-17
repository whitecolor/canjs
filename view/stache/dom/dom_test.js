


test("between tags", function(){
	
	
	var frag = can.frag("<h1>Hello {{message}}!</h1>");
	
	var template = can.stache(frag);
	
	var res = template({message: "world"});
	
	equal(res.childNodes[0].nodeName.toLowerCase(), "h1", "got an h1");
	
	equal(res.childNodes[0].innerHTML, "Hello world!", "got an h1");
	
});
