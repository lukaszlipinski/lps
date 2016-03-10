define('features/drag_drop/controller', [
	'controllers/base'
], function(
	BaseController
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		getRects: function(components) {
			var rects = {};

			for (var i = 0; i < components.length; i++) {
				var component = components[i];

				rects[component.getId()] = {
					child: component.getRect(),
					parent: component.getParentComponent().getRect()
				};
			}

			return rects;
		},

		setZIndexes: function(components, value) {
			components.forEach(function(item) {
				item.setZIndex(value);
			});
		},

		getElementFromPoint: function(x, y) {
			var selectedComponents = CM.getSelectedComponents();

			//Hide all dragged elements so they will not cover the drop point
			selectedComponents.forEach(function(item) {
				item.hide();
			});

			var el = document.elementFromPoint(x, y);

			selectedComponents.forEach(function(item) {
				item.show();
			});

			return CM.getComponent(el);
		},

		isParentOfOneOfSelectedItems: function(component) {
			var selectedComponents = CM.getSelectedComponents();

			for(var i = 0; i < selectedComponents.length; i++) {
				var selectedComponent = selectedComponents[i];

				if (selectedComponent.getParentComponent() === component) {
					return true;
				}
			}

			return false;
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});