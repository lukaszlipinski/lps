define('components/arena/controllers/main', [
	'controllers/base_component'
], function(
	BaseComponentController
) {
	'use strict';

	var controller = BaseComponentController.extend({
		initialize : function(options) {
			BaseComponentController.prototype.initialize.apply(this, arguments);
		},

		getParentComponent: function() {
			return null;
		},

		registerElement: function() {

		},

		destroy : function() {
			BaseComponentController.prototype.destroy.apply(this, arguments);
		}
	});

	controller.supportedProperties = {

	};

	return controller;
});