define('components/button', [
	'controllers/base'
], function(
	BaseController
) {
	var controller = BaseController.extend({
		initialize: function(props) {
			BaseController.prototype.initialize.apply(this, arguments);
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});

	controller.supportedProperties = {
		'aria-disabled': 'boolean',
		'aria-pressed': 'boolean'
	};

	return controller;
});
