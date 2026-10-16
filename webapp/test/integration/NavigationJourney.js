sap.ui.define([
	"sap/ui/test/opaQunit",
	"./pages/HelloPanelPage"
], function (opaTest, HelloPanelPage) {
	"use strict";

	const onTheHelloPanelPage = new HelloPanelPage();
	
	QUnit.module("Navigation");
	
	opaTest("Should open the Hello dialog", function () {
		// Arrangements - აპლიკაციის ჩატვირთვა
		onTheHelloPanelPage.iStartMyUIComponent({
			componentConfig: {
				name: "dummy.firstapp"
			}
		});

		// Actions - ღილაკზე კლიკი
		onTheHelloPanelPage.iPressTheSayHelloWithDialogButton();

		// Assertions - შემოწმება
		onTheHelloPanelPage.iShouldSeeTheHelloDialog();

		// Cleanup - აპლიკაციის დახურვა
		onTheHelloPanelPage.iTeardownMyApp();
	});
});