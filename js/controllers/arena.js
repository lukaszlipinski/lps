define('controllers/arena', [
	'controllers/base'
], function(
	BaseController
) {
	'use strict';

	return BaseController.extend({
		initialize : function(options) {
			BaseController.prototype.initialize.apply(this, arguments);

			this.view.render();
		},

		destroy : function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});