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
		'aria-disabled': 'boolean',
		'aria-pressed': 'boolean',
		'data-locked': 'boolean',
		'data-zindex': 'number'
	};

	return controller;
});
