sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("dummy.firstapp.controller.App", {
		
		// onInit is called when the app view is instantiated
		onInit: function () {
			// Get the corresponding density class from the component and apply it to the view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		}
		
	});
});