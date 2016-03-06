define('features/resize/view', [
	'views/base',
	'jquery'
], function(
	BaseView,
	$
) {

	return BaseView.extend({
		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});