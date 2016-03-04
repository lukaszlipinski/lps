define('components/box/models/main', [
	'models/base_component'
], function(
	BaseComponentModel
) {
	'use strict';

	return BaseComponentModel.extend({
		defaults: {
			disabled: false,
			locked: false,
			selected: false
		},
		initialize: function(options) {
			BaseComponentModel.prototype.initialize.apply(this, arguments);
		},

		destroy: function() {
			BaseComponentModel.prototype.destroy.apply(this, arguments);
		}
	});
});