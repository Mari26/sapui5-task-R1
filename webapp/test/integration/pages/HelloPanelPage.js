sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ui/test/actions/Press"
], function (Opa5, Press) {
	"use strict";

	const viewName = "dummy.firstapp.view.HelloPanel";
	
	class HelloPanelPage extends Opa5 {
		// Actions - მოქმედება: ღილაკზე დაჭერა
		iPressTheSayHelloWithDialogButton() {
			return this.waitFor({
				id: "helloDialogButton",
				viewName,
				actions: new Press(),
				errorMessage: "Did not find the 'Say Hello With Dialog' button on the HelloPanel view"
			});
		}

		// Assertions - შემოწმება: დიალოგის გამოჩენა
		iShouldSeeTheHelloDialog() {
			return this.waitFor({
				controlType: "sap.m.Dialog",
				success: function () {
					Opa5.assert.ok(true, "The dialog is open");
				},
				errorMessage: "Did not find the dialog control"
			});
		}
	}

	return HelloPanelPage;
});