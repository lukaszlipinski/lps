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

		setPosition: function(x, y) {
			this.$el.css({
				top: y,
				left: x
			});
		},

		setZIndex: function(value) {
			this.$el.css('zIndex', value);
		},

		toggleSelection: function(selected) {
			this.$el.attr('aria-selected', selected);
		},

		show: function() {
			this.$el.show();
		},

		hide: function() {
			this.$el.hide();
		},

		appendElement: function($el) {
			$el.appendTo(this.$el);
		},

		destroy : function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});