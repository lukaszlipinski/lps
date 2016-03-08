define('components/button/controllers/main', [
	'controllers/base_component'
], function(
	BaseComponentController
) {
	var controller = BaseComponentController.extend({
		initialize: function(props) {
			BaseComponentController.prototype.initialize.apply(this, arguments);
		},

		destroy: function() {
			BaseComponentController.prototype.destroy.apply(this, arguments);
		}
	});

	controller.supportedProperties = {
		'aria-disabled': {
			type: 'boolean',
			defaultValue: false
		},
		'aria-pressed': {
			type: 'boolean',
			defaultValue: false
		},
		'data-locked': {
			type: 'boolean',
			defaultValue: false
		},
		'data-zindex': {
			type: 'number',
			defaultValue: 1
		},
		'aria-hidden': {
			type: 'boolean',
			defaultValue: false
		},
		'data-resizable': {
			type: 'string',
			defaultValue: 'both' //'horizontally', 'vertically', 'both', 'diagonal', 'none'
		}

	};

	return controller;
});
