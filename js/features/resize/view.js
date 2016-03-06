define('features/resize/view', [
	'views/base',
	'jquery'
], function(
	BaseView,
	$
) {

	return BaseView.extend({
		$squares: null,

		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		render: function(sides) {
			var $body = $('body');

			if (!$body.find('#widget_resize').length) {
				var template = this.getTemplate('squares', {
					sides: sides
				});

				$body.append(template);
			}

			this.$squares = $body.find('#widget_resize');
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});