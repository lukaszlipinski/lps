define('mediators/component_selection/controller', [
	'controllers/base',
	'enums/components'
], function(
	BaseController,
	componentsEnums
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			this.view.on('component:selected', this.onComponentSelection.bind(this));
		},

		unSelectComponents: function(components) {
			for(var id in components) {
				if (components.hasOwnProperty(id)) {
					components[id].unSelect();
				}
			}
		},

		onComponentSelection: function(data) {
			var CM = window.CM;
			var componentToSelect = CM.getComponent(data.el);
			var allComponents = CM.getComponents();
			var isCtrlPressed = data.ctrlKey;
			//var isShiftPressed = data.shiftKey;

			if (!isCtrlPressed) {
				this.unSelectComponents(allComponents);
			}

			if (componentToSelect.getType() !== componentsEnums.ARENA) {
				componentToSelect.toggleSelection();
			}
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});