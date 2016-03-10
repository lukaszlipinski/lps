define('views/base_component', [
	'views/base'
], function(
	BaseView
) {
	'use strict';

	return BaseView.extend({
		originalInnerHTML: null,
		$outer: null,
		$editable: null,
		$backdrop: null,

		initialize : function(options) {
			BaseView.prototype.initialize.apply(this, arguments);

			this.originalInnerHTML = this.$el.html();
			this.$outer = this.$el.closestDescendent('.outer-editable');
			this.$editable = this.$el.closestDescendent('.editable');
			this.$backdrop = this.$el.closestDescendent('.backdrop');

			if (this.$backdrop.length === 0) {
				this.$outer.append('<div class="backdrop"></div>');
				this.$backdrop = this.$el.closestDescendent('.backdrop');
			}

			this.initializeContent();
		},

		initializeContent: function() {
			throw 'Please implement initializeContent for this component';
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

		resize: function(styles) {
			this.$el.css(styles);
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
			$el.appendTo(this.$editable);
		},

		destroy : function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});