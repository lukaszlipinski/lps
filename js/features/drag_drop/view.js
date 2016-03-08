define('features/drag_drop/view', [
	'views/base',
	'jquery',
	'enums/components'
], function(
	BaseView,
	$,
	componentsEnums
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
			var CM = window.CM;

			$document.on('keyup', function(e) {
				var components = CM.getSelectedComponents();
				var ctrlKey = e.ctrlKey || e.metaKey;
				var shiftKey = e.shiftKey;
				var isLeftKey = e.keyCode === 37;
				var isUpKey = e.keyCode === 38;
				var isRightKey = e.keyCode === 39;
				var isDownKey = e.keyCode === 40;

				e.preventDefault();

				for (var i = 0; i < components.length; i++) {
					var component = components[i];
					var x = 0, y = 0;

					if (isRightKey || isLeftKey) {
						x = (isRightKey ? 1 : -1) * (ctrlKey ? 5 : (shiftKey ? 10 : 1));
					}

					if (isUpKey || isDownKey) {
						y = (isDownKey ? 1 : -1) * (ctrlKey ? 5 : (shiftKey ? 10 : 1));
					}

					component.moveBy(x, y);
				}
			});

			$document.on('mousedown.' + eventScopeName, '[draggable="true"], [data-component="arena"]', function(e) {
				var isCtrlPressed = e.ctrlKey || e.metaKey;

				var componentToSelect = CM.getComponent(e.currentTarget);
				var allComponents = CM.getComponents();

				//Handle selecting items
				if ((!isCtrlPressed && !componentToSelect.isSelected()) || componentToSelect.getType() === componentsEnums.ARENA) {
					view.unSelectComponents(allComponents);
				}

				if (componentToSelect.getType() !== componentsEnums.ARENA) {
					view.unSelectComponentsTree(componentToSelect);

					if (isCtrlPressed) {
						componentToSelect.toggleSelection();
					} else {
						componentToSelect.select();
					}
				}

				//Handle moving elements
				var components = CM.getSelectedComponents();
				var moved = false;

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
					var selectedComponents = CM.getSelectedComponents();
					var currentX = e.pageX,
						currentY = e.pageY;

					moved = true;

					e.preventDefault();

					view.controller.setZIndexes(selectedComponents, draggingZIndex);

					//Moving elements
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

						selectedComponent.setPosition(currentLeft, currentTop);
					}

					var isOverDroppable = view.controller.isOverDroppableItem(
						map,
						currentX, currentY
					);

					if (isOverDroppable) {

					}
				});

				$document.on('mouseup.' + eventScopeName, function(e) {
					var currentX = e.pageX,
						currentY = e.pageY;

					$document.off('mousemove.' + eventScopeName);
					$document.off('mouseup.' + eventScopeName);

					//Dropping elements
					if (moved) {
						var isOverDroppable = view.controller.isOverDroppableItem(
							map,
							currentX, currentY
						);

						if (isOverDroppable) {
							var dropPointComponent = view.controller.getElementFromPoint(currentX, currentY);
							dropPointComponent.appendComponents(currentX, currentY, CM.getSelectedComponents());
						}
					}

					view.controller.setZIndexes(components, defaultZIndex);
				});
			});
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

			for(var i = 0; i < components.length; i++) {
				if (selectedComponentParent !== components[i].getParentComponent()) {
					components[i].unSelect();
				}
			}
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