define('mediators/component_selection/controller', [
	'controllers/base',
	'enums/components'
], function(
	BaseController,
	componentsEnums
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			this.view.on('component:select', this.onComponentSelection.bind(this));
		},



		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});