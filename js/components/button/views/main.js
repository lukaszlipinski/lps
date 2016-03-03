define('components/button/views/main', [
	'views/base_component'
], function(
	BaseComponentView
) {
	'use strict';

	return BaseComponentView.extend({
		initialize : function() {
			BaseComponentView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		destroy : function() {
			BaseComponentView.prototype.destroy.apply(this, arguments);
		}
	});
});