sap.ui.define([
	"sap/ui/model/resource/ResourceModel",
	"dummy/firstapp/model/formatter"
], function (ResourceModel, formatter) {
	"use strict";

	QUnit.module("Formatting function", {});

	QUnit.test("Should return the translated texts", assert => {
		// Mocking the resource model (i18n)
		const resourceModel = new ResourceModel({
			bundleUrl: sap.ui.require.toUrl("dummy/firstapp/i18n/i18n.properties"),
			supportedLocales: [""],
			fallbackLocale: ""
		});

		// Mocking the controller
		const controllerMock = {
			getOwnerComponent() {
				return {
					getModel() {
						return resourceModel;
					}
				};
			}
		};

		// System under test
		const fnIsolatedFormatter = formatter.statusText.bind(controllerMock);

		// Assertions: checking if outputs match expectations
		assert.strictEqual(fnIsolatedFormatter("A"), "New", "The long text for status A is correct");
		assert.strictEqual(fnIsolatedFormatter("B"), "In Progress", "The long text for status B is correct");
		assert.strictEqual(fnIsolatedFormatter("C"), "Done", "The long text for status C is correct");
		assert.strictEqual(fnIsolatedFormatter("Foo"), "Foo", "The long text for status Foo is correct");
	});
});