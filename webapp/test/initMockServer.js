sap.ui.define([
	"../localService/mockserver"
], function (mockserver) {
	"use strict";

	// Initialize the mock server before starting the app
	mockserver.init();

	// Initialize the embedded component on the HTML page
	sap.ui.require(["sap/ui/core/ComponentSupport"]);
});