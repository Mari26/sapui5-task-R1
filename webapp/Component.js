sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	"use strict";

	return UIComponent.extend("dummy.firstapp.Component", {
		metadata: {
			interfaces: ["sap.ui.core.IAsyncContentCreation"],
			manifest: "json"
		},

		init: function () {
			// Call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);

			// Set data model
			const oData = {
				recipient: {
					name: "World"
				}
			};
			const oModel = new JSONModel(oData);
			this.setModel(oModel);

			// Initialize the router to create views based on the url/hash
			this.getRouter().initialize();
		}
	});
});