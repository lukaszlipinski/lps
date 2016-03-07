define('features/resize/model', [
	'models/base_component'
], function(
	BaseComponentModel
) {
	'use strict';

	return BaseComponentModel.extend({
		defaults: {
			resizable: 'both'
		},
		initialize: function(options) {
			BaseComponentModel.prototype.initialize.apply(this, arguments);
		},

		getType: function() {
			return this.get('resizable');
		},

		destroy: function() {
			BaseComponentModel.prototype.destroy.apply(this, arguments);
		}
	});
});