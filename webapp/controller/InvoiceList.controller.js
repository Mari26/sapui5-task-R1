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

		// Helper function to combine and apply both filters
        _applyFilters() {
            const filter = [];
            
            // Get the controls by their IDs
            const searchField = this.byId("searchField");
            const comboBox = this.byId("statusComboBox");

            // Extract values safely
            const query = searchField ? searchField.getValue() : "";
            const selectedKey = comboBox ? comboBox.getSelectedKey() : "";

            // Add search filter if the query is not empty
            if (query) {
                filter.push(new Filter("ProductName", FilterOperator.Contains, query));
            }

            // Add status filter if a specific status is selected (ignores empty key/All)
            if (selectedKey) {
                filter.push(new Filter("Status", FilterOperator.EQ, selectedKey));
            }

            // Apply both filters together to the list
            const list = this.byId("invoiceList");
            const binding = list.getBinding("items");
            binding.filter(filter);
        },

        // Triggered when user types in the SearchField
        onFilterInvoices() {
            // Call the common filter method
            this._applyFilters();
        },

        // Triggered when user selects an item in the ComboBox
        onFilterStatus() {
            // Call the common filter method
            this._applyFilters();
        },
		// Event handler to navigate to the detail page
		onPress(event) {
			// Get the clicked ObjectListItem
			const item = event.getSource();
			// Get the router instance
			const router = UIComponent.getRouterFor(this);
			
			// Navigate to the 'detail' route and pass the encoded binding path of the selected item
			// substring(1) to remove the first '/' before encoding, as it's a special URL character
			router.navTo("detail", {
				invoicePath: window.encodeURIComponent(item.getBindingContext("invoice").getPath().substring(1))
			});
		}
	});

	return InvoiceList;
});