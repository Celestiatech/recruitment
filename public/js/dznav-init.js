var body = $('body');
	
function dzSettings({themeFullColor_value,themeLayout_value,headerOption_value,backgroundColor_value,themeCorner_value}) {
	
	this.themeFullColor_value = themeFullColor_value || "color_1";
	this.themeLayout_value = themeLayout_value || "wide-layout";
	this.headerOption_value = headerOption_value || "sticky-header";
	this.backgroundColor_value = backgroundColor_value || "color_0";
	this.themeCorner_value = themeCorner_value || "round";

	this.manageLayout();
	this.managePrimaryColor();
	this.manageHeaderOption();
	this.manageBackgroundColorOption();
	this.manageCornerOption();
}


dzSettings.prototype.manageBackgroundColorOption = function() {
	switch(this.backgroundColor_value) {
		case "color_0": 
			body.attr("data-body-bg", "color_0");
			break;
		case "color_1": 
			body.attr("data-body-bg", "color_1");
			break;
		case "color_2": 
			body.attr("data-body-bg", "color_2");
			break;
		case "color_3": 
			body.attr("data-body-bg", "color_3");
			break;
		case "color_4": 
			body.attr("data-body-bg", "color_4");
			break;
		default:
			body.attr("data-body-bg", "color_0");
	}
}

dzSettings.prototype.managePrimaryColor = function() {
	switch(this.themeFullColor_value) {
		case "color_1": 
            body.attr("data-color", "color_1");
			$('.logo-dark img').attr('src', "images/logo.png");                
            break;
            
        case "color_2": 
            body.attr("data-color", "color_2");
			$('.logo-dark img').attr('src', "images/logo-2.png");
            break;
            
        case "color_3": 
            body.attr("data-color", "color_3");
			$('.logo-dark img').attr('src', "images/logo-3.png");
            break;
            
        case "color_4": 
            body.attr("data-color", "color_4");
            $('.logo-dark img').attr('src', "images/logo-4.png");
            break;
            
        default:
            body.attr("data-color", "color_1");
			$('.logo-dark img').attr('src', "images/logo.png");
    }
}

dzSettings.prototype.manageLayout = function() {
	switch(this.themeLayout_value){
		case "wide-layout": 
			body.attr("data-layout", "wide-layout");
			 break;
		case "boxed": 
			body.attr("data-layout", "boxed");
			break;
		case "frame": 
			body.attr("data-layout", "frame");
			break;
		default:
			body.attr("data-layout", "wide-layout");
	}
}

dzSettings.prototype.manageHeaderOption = function() {
	switch(this.headerOption_value){
		case "sticky-header": 
			body.attr("data-headerposition", "sticky-header");
			 break;
		case "sticky-no": 
			body.attr("data-headerposition", "sticky-no");
			break;
		default:
			body.attr("data-headerposition", "sticky-header");
	}
}

dzSettings.prototype.manageCornerOption = function() {
	switch(this.themeCorner_value){
		case "sharp": 
			body.attr("data-theme-corner", "sharp");
			 break;
		case "round": 
			body.attr("data-theme-corner", "round");
			break;
		default:
			body.attr("data-theme-corner", "sharp");
	}
}

"use strict"
var dzSettingsOptions = {};

(function($) {

	"use strict"
	dzSettingsOptions = {
		themeFullColor_value: "color_1",
		themeLayout_value: "wide-layout",
		headerOption_value: "sticky-header",
		backgroundColor_value: "color_0",
		themeCorner_value: "round",
	};
	
	new dzSettings(dzSettingsOptions); 
	
})(jQuery);