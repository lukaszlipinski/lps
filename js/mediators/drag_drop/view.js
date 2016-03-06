define('mediators/drag_drop/view', [
	'views/base',
	'jquery'
], function(
	BaseView,
	$
) {
	var eventScopeName = 'drag_drop';
	var defaultZIndex = 1;
	var draggingZIndex = 5;

	return BaseView.extend({
		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			var view = this;
			var $document = $(document);

			this.$el.on('mousedown.' + eventScopeName, '[draggable="true"]', function(e) {
				var components = CM.getSelectedComponents();

				if (!components.length) {
					return;
				}

				e.stopPropagation();

				var startX = e.pageX,
					startY = e.pageY;

				var startPositions = view.controller.getRects(components);
				var map = view.controller.getEmptyMap();

				view.controller.generateMap(
					map,
					view.controller.getRootElement(),
					components[0].getParentComponent()//selected items always have the same parent
				);

				$document.on('mousemove.' + eventScopeName, function(e) {
					e.preventDefault();

					var currentX = e.pageX,
						currentY = e.pageY;

					view.controller.setZIndexes(components, draggingZIndex);

					var isOverDroppable = view.controller.isOverDroppableItem(
						map,
						currentX, currentY);

					var CM = window.CM;
					var selectedComponents = CM.getSelectedComponents();

					for (var i = 0; i < selectedComponents.length; i++) {
						var selectedComponent = selectedComponents[i];
						var componentRect = startPositions[selectedComponent.getId()].child,
							parentComponentRect = startPositions[selectedComponent.getId()].parent;

						var currentTop = componentRect.top + (currentY - startY) - parentComponentRect.top,
							currentLeft = componentRect.left + (currentX - startX) - parentComponentRect.left;

						if (selectedComponent.isLocked()) {
							currentTop = Math.max(0, Math.min(parentComponentRect.height - componentRect.height, currentTop));
							currentLeft = Math.max(0, Math.min(parentComponentRect.width - componentRect.width, currentLeft));
						}

						view.moveElement(selectedComponent.getElement(), currentLeft, currentTop);
						selectedComponent.setPosition(selectedComponent.getRect());
					}
				});

				$document.on('mouseup.' + eventScopeName, function(e) {
					$document.off('mousemove.' + eventScopeName);
					$document.off('mouseup.' + eventScopeName);

					view.controller.setZIndexes(components, defaultZIndex);
				});
			});
		},

		moveElement: function($el, posX, posY) {
			$el.css({
				top: posY,
				left: posX
			});
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});