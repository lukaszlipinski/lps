define('mediators/drag_drop/controller', [
	'controllers/base'
], function(
	BaseController
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});