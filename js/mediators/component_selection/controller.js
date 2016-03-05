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
			this.view.on('component:select', this.onComponentSelection.bind(this));
		},

		unSelectComponents: function(components) {
			for(var id in components) {
				if (components.hasOwnProperty(id)) {
					components[id].unSelect();
				}
			}
		},

		unSelectComponentsTree: function(selectedComponent) {
			var components = CM.getComponents();
			var selectedComponentParent = selectedComponent.getParentComponent();

			for(var id in components) {
				if (components.hasOwnProperty(id)) {
					if (selectedComponentParent !== components[id].getParentComponent()) {
						components[id].unSelect();
					}
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
				this.unSelectComponentsTree(componentToSelect);

				componentToSelect.toggleSelection();
			}
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});