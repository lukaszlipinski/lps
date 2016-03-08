define('controllers/base_component', [
	'controllers/base',
	'jquery'
], function(
	BaseController,
	$
) {
	'use strict';

	return BaseController.extend({
		parentComponent: null,

		initialize : function(options) {
			BaseController.prototype.initialize.apply(this, arguments);

			this.parentComponent = options.parentComponent || null;

			var configModel = this.getModel('config');

			configModel.onToggleSelection(this, this.onToggleSelection.bind(this));
			configModel.onZIndexChange(this, this.onZIndexChange.bind(this));
			configModel.onVisibilityChange(this, this.onVisibilityChange.bind(this));

			this.setDefaults();
		},

		setDefaults: function() {
			var configModel = this.getModel('config');

			this.setZIndex()
		},

		getParentComponent: function() {
			return this.parentComponent;
		},

		setParentComponent: function(component) {
			this.parentComponent = component;
		},

		getId: function() {
			return this.getModel('config').getId();
		},

		getType: function() {
			return this.getModel('config').getType();
		},

		getResizableType: function() {
			return this.getModel('config').getResizableType();
		},

		isResizable: function() {
			return this.getResizableType() !== 'none';
		},

		isSelected: function() {
			return this.getModel('config').isSelected();
		},

		isDroppable: function() {
			return this.getModel('config').isDroppable();
		},

		setZIndex: function(value) {
			this.getModel('config').setZIndex(value);
		},

		select: function() {
			this.getModel('config').select();
		},

		unSelect: function() {
			this.getModel('config').unSelect();
		},

		toggleSelection: function() {
			this.getModel('config').toggleSelection();
		},

		isLocked: function() {
			return this.getModel('config').isLocked();
		},

		setPosition: function(x, y) {
			this.view.setPosition(x, y);
		},

		moveBy: function(x, y) {
			var rect = this.getRect();
			var parentRect = this.getParentComponent().getRect();
			var top = rect.top - parentRect.top;
			var left = rect.left - parentRect.left;

			this.setPosition(left + x, top + y);
		},

		resize: function(styles) {
			this.view.resize(styles);
		},

		getRect: function() {
			return $.extend({}, this.view.getRect());
		},

		getElement: function() {
			return this.view.getElement();
		},

		show: function() {
			this.getModel('config').show();
		},

		hide: function() {
			this.getModel('config').hide();
		},

		showDropIndicator: function() {

		},

		appendComponents: function(x, y, components) {
			var _self = this;
			var view = this.view;
			var rect = this.getRect();

			components.forEach(function(item) {
				//Locked elements can not change their parent elements
				if (item.isLocked()) {
					return;
				}

				var $itemEl = item.getElement();
				var itemRect = item.getRect();

				itemRect.top = itemRect.top - rect.top;
				itemRect.left = itemRect.left - rect.left;

				item.setParentComponent(_self);
				item.setPosition(itemRect.left, itemRect.top);

				view.appendElement($itemEl);
			});
		},

		getMinWidth: function() {
			return this.getModel('config').getMinWidth();
		},

		getMaxWidth: function() {
			return this.getModel('config').getMaxWidth();
		},

		getMinHeight: function() {
			return this.getModel('config').getMinHeight();
		},

		getMaxHeight: function() {
			return this.getModel('config').getMaxHeight();
		},

		onVisibilityChange: function() {
			var isVisible = this.getModel('config').isVisible();

			if (isVisible) {
				this.view.show();
			} else {
				this.view.hide();
			}
		},

		onZIndexChange: function() {
			var zIndex = this.getModel('config').getZIndex();

			this.view.setZIndex(zIndex);
		},

		onToggleSelection: function() {
			var isSelected = this.getModel('config').isSelected();

			this.view.toggleSelection(isSelected);
		},

		destroy : function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});