sap.ui.define([], function () {
	"use strict";

	return {
		name: "QUnit test suite for dummy.firstapp",
		defaults: {
			page: "ui5://test-resources/dummy/firstapp/Test.qunit.html?testsuite={suite}&test={name}",
			qunit: {
				version: 2
			},
			ui5: {
				theme: "sap_horizon"
			},
			loader: {
				paths: {
					"dummy/firstapp": "../"
				}
			}
		},
		tests: {
			"unit/unitTests": {
				title: "Unit Tests for dummy.firstapp"
			},
			
			"integration/opaTests": {
				title: "Integration Tests for dummy.firstapp"
			}
		}
	};
});