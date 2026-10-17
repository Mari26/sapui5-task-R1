sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
	"use strict";

	return UIComponent.extend("dummy.firstapp.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init: function () {
			// Call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// Set primary data model
			const oData = {
				recipient: {
					name: "World"
				}
			};
			const oModel = new JSONModel(oData);
			this.setModel(oModel);

			// Set the device model
			const oDeviceModel = new JSONModel(Device);
			oDeviceModel.setDefaultBindingMode("OneWay");
			this.setModel(oDeviceModel, "device");

			// Initialize the router
			this.getRouter().initialize();
		},

		// Helper method to determine the CSS class for content density
		getContentDensityClass: function () {
			// If the device supports touch, return cozy mode (larger elements for tapping)
			// Otherwise, return compact mode (smaller elements for precise mouse clicks)
			return Device.support.touch ? "sapUiSizeCozy" : "sapUiSizeCompact";
		}
	});
});