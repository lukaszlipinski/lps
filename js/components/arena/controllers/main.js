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

		/**
		 * @see BaseComponentController
		 */
		getParentComponent: function() {
			return null;
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