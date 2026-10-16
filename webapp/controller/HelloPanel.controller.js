sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	const HelloPanel = Controller.extend("dummy.firstapp.controller.HelloPanel", {
		onShowHello() {
			// Read msg from i18n model
			const recipient = this.getView().getModel().getProperty("/recipient/name");
			const resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			const msg = resourceBundle.getText("helloMsg", [recipient]);
			
			// Show message
			MessageToast.show(msg);
		},
		async onOpenDialog() {
			// Load the dialog fragment asynchronously if it has not been loaded yet
			// The ??= operator assigns the loaded fragment to this.dialog only if this.dialog is undefined or null
			this.dialog ??= await this.loadFragment({
				name: "dummy.firstapp.view.HelloDialog"
			});
			
			// Open the loaded dialog
			this.dialog.open();
		},
		onCloseDialog() {
			// Find the dialog by its ID and call the close function
			this.byId("helloDialog").close();
		}
	});

	return HelloPanel;
});