define('controllers/base_component', [
	'controllers/base',
	'jquery'
], function(
	BaseController,
	$
) {
	'use strict';

	return BaseController.extend({
		initialize : function(options) {
			BaseController.prototype.initialize.apply(this, arguments);
		},

		destroy : function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});