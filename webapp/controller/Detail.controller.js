sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel" // Imported JSONModel
], function (Controller, UIComponent, History, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("dummy.firstapp.controller.Detail", {
		onInit() {
			// Define the view model for currency formatting
			const viewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(viewModel, "view");

			const router = UIComponent.getRouterFor(this);
			router.getRoute("detail").attachPatternMatched(this.onObjectMatched, this);
		},

		onObjectMatched(event) {
			this.byId("rating").reset();
			const invoicePath = window.decodeURIComponent(event.getParameter("arguments").invoicePath);
			this.getView().bindElement({
				path: "/" + invoicePath,
				model: "invoice"
			});
		},

		onNavBack() {
			const history = History.getInstance();
			const previousHash = history.getPreviousHash();
			if (previousHash !== undefined) {
				window.history.go(-1);
			} else {
				const router = UIComponent.getRouterFor(this);
				router.navTo("overview", {}, true);
			}
		},

		onRatingChange(event) {
			const value = event.getParameter("value");
			const resourceBundle = this.getView().getModel("i18n").getResourceBundle();
			MessageToast.show(resourceBundle.getText("ratingConfirmation", [value]));
		}
	});
});