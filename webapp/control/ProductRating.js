sap.ui.define([
	"sap/ui/core/Control",
	"sap/m/Label",
	"sap/m/Button",
	"sap/m/RatingIndicator"
], function (Control, Label, Button, RatingIndicator) {
	"use strict";

	return Control.extend("dummy.firstapp.control.ProductRating", {
		
		// Metadata defines the API of our custom control
		metadata: {
			properties: {
				value: { type: "float", defaultValue: 0 } // Stores the rating value
			},
			aggregations: {
				// Internal controls (hidden from the outside)
				_rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },
				_label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
				_button: { type: "sap.m.Button", multiple: false, visibility: "hidden" }
			},
			events: {
				// Custom event fired when the user submits the rating
				change: {
					parameters: {
						value: "float"
					}
				}
			}
		},

		// Initializes the inner controls when our custom control is instantiated
		init: function () {
			this.setAggregation("_rating", new RatingIndicator({
				value: this.getValue(),
				iconSize: "2rem",
				liveChange: this._onRate.bind(this)
			}));
			
			this.setAggregation("_label", new Label({
				text: "{i18n>productRatingLabelInitial}"
			}).addStyleClass("sapUiSmallMargin"));
			
			this.setAggregation("_button", new Button({
				text: "{i18n>productRatingButton}",
				press: this._onSubmit.bind(this)
			}).addStyleClass("sapUiTinyMarginTopBottom"));
		},

		// Overrides the default setter to update the internal rating control directly
		setValue: function (fValue) {
			this.setProperty("value", fValue, true);
			this.getAggregation("_rating").setValue(fValue);
			return this;
		},

		// Resets the control to its initial state (e.g., when opening a different product)
		reset: function () {
			const resourceBundle = this.getModel("i18n")?.getResourceBundle();
			this.setValue(0);
			this.getAggregation("_label").setDesign("Standard");
			this.getAggregation("_rating").setEnabled(true);
			this.getAggregation("_label").setText(resourceBundle.getText("productRatingLabelInitial"));
			this.getAggregation("_button").setEnabled(true);
		},

		// Internal event handler for when the user clicks the stars
		_onRate: function (event) {
			const resourceBundle = this.getModel("i18n")?.getResourceBundle();
			const fValue = event.getParameter("value");
			
			this.setProperty("value", fValue, true);
			this.getAggregation("_label").setText(resourceBundle.getText("productRatingLabelIndicator", [fValue, event.getSource().getMaxValue()]));
			this.getAggregation("_label").setDesign("Bold");
		},

		// Internal event handler for when the user clicks the 'Rate' button
		_onSubmit: function (event) {
			const resourceBundle = this.getModel("i18n")?.getResourceBundle();
			
			this.getAggregation("_rating").setEnabled(false);
			this.getAggregation("_label").setText(resourceBundle.getText("productRatingLabelFinal"));
			this.getAggregation("_button").setEnabled(false);
			
			// Fire the custom event so the parent view/controller knows the rating is done
			this.fireEvent("change", {
				value: this.getValue()
			});
		},

		// The renderer generates the actual HTML structure for our control
		renderer: {
			apiVersion: 4,
			render: function (rm, control) {
				const tooltip = control.getTooltip_AsString();
				
				// Open main div container
				rm.openStart("div", control);
				rm.class("myAppDemoWTProductRating");
				if (tooltip) {
					rm.attr("title", tooltip);
				}
				rm.openEnd();
				
				// Render the hidden inner controls
				rm.renderControl(control.getAggregation("_rating"));
				rm.renderControl(control.getAggregation("_label"));
				rm.renderControl(control.getAggregation("_button"));
				
				// Close main div container
				rm.close("div");
			}
		}
	});
});