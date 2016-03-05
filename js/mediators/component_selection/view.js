define('mediators/component_selection/view', [
	'views/base'
], function(
	BaseView
) {
	return BaseView.extend({
		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			var view = this;

			this.$el.on('click', '[data-component]', function(e) {
				var el = e.currentTarget;

				view.trigger('component:selected', {
					el: el,
					shiftKey: e.shiftKey,
					ctrlKey: e.ctrlKey || e.metaKey
				});

				e.stopPropagation();
			});
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});