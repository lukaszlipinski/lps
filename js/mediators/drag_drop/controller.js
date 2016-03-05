define('mediators/drag_drop/controller', [
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
			this.view.on('component:move', this.onComponentMovement.bind(this));
			this.view.on('component:move:stop', this.onComponentStopMovement.bind(this));
		},

		getComponentPosition: function(component, diffX, diffY) {
			var componentRect = component.getControllerRect(),
				parentComponentRect = component.getParentComponent().getViewRect();

			var currentTop = componentRect.top + (diffY > 0 ? diffY - parentComponentRect.top : 0),
				currentLeft = componentRect.left + (diffX > 0 ? diffX - parentComponentRect.left : 0);

			if (component.isLocked()) {
				currentTop = Math.max(0, Math.min(parentComponentRect.height - componentRect.height, currentTop));
				currentLeft = Math.max(0, Math.min(parentComponentRect.width - componentRect.width, currentLeft));
			}

			return {
				x: currentLeft,
				y: currentTop
			}
		},

		onComponentMovement: function(data) {
			var CM = window.CM;
			var selectedComponents = CM.getSelectedComponents();

			for (var i = 0; i < selectedComponents.length; i++) {
				var selectedComponent = selectedComponents[i];
				var position = this.getComponentPosition(selectedComponent, data.diffX, data.diffY);

				this.view.moveElement(selectedComponent.getElement(), position.x, position.y);
			}
		},

		onComponentStopMovement: function(data) {
			var CM = window.CM;
			var selectedComponents = CM.getSelectedComponents();

			for (var i = 0; i < selectedComponents.length; i++) {
				var selectedComponent = selectedComponents[i];
				var position = this.getComponentPosition(selectedComponent, data.diffX, data.diffY);

				selectedComponent.setPosition(position.x, position.y);
			}
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});