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
		'aria-dropeffect': {
			type: 'string',
			defaultValue: 'none'
		},
		'aria-hidden': {
			type: 'boolean',
			defaultValue: false
		}
	};

	return controller;
});