define('controllers/base_component', [
	'controllers/base',
	'jquery'
], function(
	BaseController,
	$
) {
	'use strict';

	return BaseController.extend({
		parentComponent: null,
		initialize : function(options) {
			BaseController.prototype.initialize.apply(this, arguments);

			this.parentComponent = options.parentComponent || null;
		},

		getParentComponent: function() {
			return this.parentComponent;
		},

		isLocked: function() {
			return this.getModel('config').isLocked();
		},

		getRect: function() {
			return this.view.getRect();
		},

		destroy : function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});