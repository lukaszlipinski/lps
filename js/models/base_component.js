define('models/base_component', [
	'models/base'
], function(
	BaseModel
) {
	'use strict';

	return BaseModel.extend({
		initialize: function(options) {

		},

		isLocked: function() {
			return this.get('locked') === true;
		},

		destroy: function() {

		}
	});
});