define('mediators/drag_drop/view', [
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

			$('body').on('click', '[data-component]', function(e) {
				var el = e.currentTarget;
				var isCtrlPressed = e.ctrlKey || e.metaKey;
				var componentToSelect = CM.getComponent(e.currentTarget);
				var allComponents = CM.getComponents();

				if (!isCtrlPressed) {
					//view.unSelectComponents(allComponents);
				}

				if (componentToSelect.getType() !== componentsEnums.ARENA) {
					//view.unSelectComponentsTree(componentToSelect);

					//componentToSelect.toggleSelection();
				}

				//e.stopPropagation();
			});

			this.$el.on('mousedown.' + eventScopeName, '[draggable="true"]', function(e) {
				var isCtrlPressed = e.ctrlKey || e.metaKey;

				var componentToSelect = CM.getComponent(e.currentTarget);
				var allComponents = CM.getComponents();

				if (!isCtrlPressed && !componentToSelect.isSelected()) {
					view.unSelectComponents(allComponents);
				}

				//if (!componentToSelect.isSelected()) {
					//e.stopPropagation();

					if (componentToSelect.getType() !== componentsEnums.ARENA) {
						view.unSelectComponentsTree(componentToSelect);

						componentToSelect.select();
					}
				//}

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

						view.moveElement(selectedComponent.getElement(), currentLeft, currentTop);
						selectedComponent.setPosition(selectedComponent.getRect(), true);
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
							console.log(dropPointComponent.view.$el);
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