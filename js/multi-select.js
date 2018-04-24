jQuery.fn.quickcheck = function(settings) {
	
	settings = jQuery.extend({
		mode: "default",
		mouseup: "html"
	}, settings);
	
	
	var enabled = false;
	var check = true;

	$(this).mousedown(function(event){
		enabled = true;
		check = !this.checked;
		$(this).one('mouseout', function(){
			switch(settings.mode){
				case "check":
					this.checked = true;
				break;
				case "uncheck":
					//this.checked = false;
				break;
				default: //"default"
					this.checked = check;
			}
		});
	}).mouseover(function(){
		if(enabled){
			switch(settings.mode){
				case "check":
					this.checked = true;
				break;
				case "uncheck":
					this.checked = false;
				break;
				case "toggle":
					this.checked = !this.checked;
				break;
				default: //"default"
					this.checked = check;
			}
		}
	});
	
	$(settings.mouseup).mouseup(function(event){
		enabled = false;
	});
}