sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";

	return {
		init: function () {
			// Create a MockServer instance targeting the same URL defined in manifest.json
			const mockServer = new MockServer({
				rootUri: sap.ui.require.toUrl("dummy/firstapp/V2/Northwind/Northwind.svc/")
			});
			const urlParams = new URLSearchParams(window.location.search);

			// Configure mock server with a realistic delay (500ms by default)
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: parseInt(urlParams.get("serverDelay") || "500")
			});

			// Read local metadata and mock data
			const path = sap.ui.require.toUrl("dummy/firstapp/localService");
			mockServer.simulate(path + "/metadata.xml", path + "/mockdata");

			// Start intercepting requests
			mockServer.start();
		}
	};
});