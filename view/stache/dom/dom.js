steal('can/util', "can/view/parser",function(can, parser){
	
	
	var matchStash = new RegExp("\\{\\{[^\\}]*\\}\\}\\}?");
	
	var parseDOM = function(el, callbacks){
		var i = 0,
			childNodes = el.childNodes;
		while(i < childNodes.length) {
			if(child.nodeType === 3) {
				if ( matchStash.test(child.nodeValue) ) {
					var replacedChildren = [];
					parser(child.nodeValue, {
						chars: function(text){
							replacedChildren.push(text);
						},
						special: function(text){
							var firstAndText = mustacheCore.splitModeFromExpression(text, {}),
								mode = firstAndText.mode,
								expression = firstAndText.expression;
							
							var renderer = mustacheCore.makeLiveBindingBranchRenderer(mode, expression, {text: true});
							
						}
					});
					
				}
			}
		}
	};
	
	
	return function(el, data){
		parseDOM(el,{
			
		});
		
		var data = target();
	};
	
});
