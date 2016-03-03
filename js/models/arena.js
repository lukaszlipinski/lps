define('models/arena', [
	'models/base'
], function(
	BaseModel
) {
	'use strict';

	return BaseModel.extend({
		initialize: function(options) {
			BaseModel.prototype.initialize.apply(this, arguments);
		},

		destroy: function() {
			BaseModel.prototype.destroy.apply(this, arguments);
		}
	});
});