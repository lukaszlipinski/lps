define('views/arena', [
	'views/base'
], function(
	BaseView
) {
	'use strict';

	return BaseView.extend({
		initialize : function() {
			BaseView.prototype.initialize.apply(this, arguments);
			console.log("ok");
		},

		initializeEventListeners: function() {

		},

		render: function() {

		},

		destroy : function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});