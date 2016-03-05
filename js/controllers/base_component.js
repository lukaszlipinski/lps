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
			configModel.onPositionChange(this, this.onPositionChange.bind(this))
		},

		getParentComponent: function() {
			return this.parentComponent;
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

		setPosition: function(x, y) {
			this.getModel('config').setPosition(x, y);
		},

		getControllerRect: function() {
			var configModel = this.getModel('config');

			return {
				width: configModel.getWidth(),
				height:configModel.getHeight(),
				top:configModel.getTop(),
				left:configModel.getLeft()
			}
		},

		getViewRect: function() {
			return this.view.getViewRect();
		},

		getElement: function() {
			return this.view.getElement();
		},

		onPositionChange: function() {
			var position = this.getModel('config').getPosition();

			this.view.setPosition(position.x, position.y);
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