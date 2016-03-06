define('features/resize/controller', [
	'controllers/base'
], function(
	BaseController
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
			this.view.render(this.getSides());
		},

		initializeEventListeners: function() {

		},

		getSides: function() {
			return ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'];
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});