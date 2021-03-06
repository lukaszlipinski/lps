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
			var borderTopWidth = parseInt(this.$el.css("borderTopWidth"), 10),
				borderLeftWidth = parseInt(this.$el.css("borderLeftWidth"), 10),
				borderRightWidth = parseInt(this.$el.css("borderRightWidth"), 10),
				borderBottomWidth = parseInt(this.$el.css("borderBottomWidth"), 10);

			var rect = this.el.getBoundingClientRect();

			return {
				top: rect.top + borderTopWidth,
				left: rect.left + borderLeftWidth,
				bottom: rect.bottom,
				right: rect.right,
				width: rect.width,
				height: rect.height
			};
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

		showDropIndicator: function() {
			this.$backdrop.html('Drop here').show();
		},

		hideDropIndicator: function() {
			this.$backdrop.hide();
		},

		appendElement: function($el) {
			$el.appendTo(this.$editable);
		},

		destroy : function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});