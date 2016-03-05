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
		},

		getParentComponent: function() {
			return this.parentComponent;
		},

		getId: function() {
			return this.getModel('config').getId();
		},

		getType: function() {
			return this.getModel('config').getType();
		},

		isSelected: function() {
			return this.getModel('config').isSelected();
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

		setPosition: function(rect) {
			this.getModel('config').setPosition(rect.left, rect.top);
		},

		getRect: function() {
			return this.view.getRect();
		},

		getElement: function() {
			return this.view.getElement();
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