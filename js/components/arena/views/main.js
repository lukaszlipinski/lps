define('components/arena/views/main', [
	'views/base_component',
	'jquery'
], function(
	BaseComponentView,
	$
) {
	'use strict';

	return BaseComponentView.extend({
		initialize : function() {
			BaseComponentView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		initializeContent: function() {
			//do nothing
		},

		render: function() {

		},

		destroy : function() {
			BaseComponentView.prototype.destroy.apply(this, arguments);
		}
	});
});