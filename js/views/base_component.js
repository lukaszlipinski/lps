define('views/base_component', [
	'views/base'
], function(
	BaseView
) {
	'use strict';

	return BaseView.extend({
		initialize : function(options) {
			BaseView.prototype.initialize.apply(this, arguments);

		},

		getRect: function() {
			return this.el.getBoundingClientRect();
		},

		getElement: function() {
			return this.$el;
		},

		toggleSelection: function(selected) {
			this.$el.attr('aria-selected', selected);
		},

		destroy : function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});