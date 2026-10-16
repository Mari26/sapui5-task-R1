sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/core/UIComponent" // Added UIComponent for routing
], function (Controller, JSONModel, Filter, FilterOperator, UIComponent) {
	"use strict";

	const InvoiceList = Controller.extend("dummy.firstapp.controller.InvoiceList", {
		onInit() {
			const viewModel = new JSONModel({
				currency: "EUR"
			});
			this.getView().setModel(viewModel, "view");
		},

		onFilterInvoices(event) {
			const filter = [];
			const query = event.getParameter("query");
			if (query) {
				filter.push(new Filter("ProductName", FilterOperator.Contains, query));
			}

			const list = this.byId("invoiceList");
			const binding = list.getBinding("items");
			binding.filter(filter);
		},

		// Event handler to navigate to the detail page
		onPress() {
			const router = UIComponent.getRouterFor(this);
			router.navTo("detail");
		}
	});

	return InvoiceList;
});