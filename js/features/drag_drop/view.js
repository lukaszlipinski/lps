define('features/drag_drop/view', [
	'views/base',
	'jquery',
	'enums/components',
	'enums/keys',
	'common/app'
], function(
	BaseView,
	$,
	componentsEnums,
	keysEnums,
	app
) {
	var eventScopeName = 'drag_drop';
	var defaultZIndex = 1;
	var draggingZIndex = 5;

	return BaseView.extend({
		moved: false,
		hoveredElement: null,
		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			var $document = $(document);

			$document.on('keyup', this.onKeyboardEvents.bind(this));
			$document.on('mousedown.' + eventScopeName, '[draggable="true"], [data-component="arena"]', this.onDragStart.bind(this));
			$document.on('click.' + eventScopeName, '[draggable="true"], [data-component="arena"]', this.handleSelectingComponentsOnClick.bind(this));
		},

		handleSelectingComponentsOnClick: function(e) {
			var CM = window.CM;
			var componentToSelect = CM.getComponent(e.currentTarget);
			var allComponents = CM.getComponents();
			var isCtrlPressed = e.ctrlKey || e.metaKey;

			e.stopPropagation();

			//Handle selecting items
			if (!isCtrlPressed || componentToSelect.getType() === componentsEnums.ARENA) {
				this.unSelectComponents(allComponents);
			}

			if (componentToSelect.getType() !== componentsEnums.ARENA) {
				this.unSelectComponentsTree(componentToSelect);

				if (isCtrlPressed) {
					componentToSelect.toggleSelection();

					app.publish('component:multi_select', {});
				} else {
					componentToSelect.select();
				}
			}
		},

		handleSelectingComponents: function(e) {
			var CM = window.CM;
			var componentToSelect = CM.getComponent(e.currentTarget);
			var allComponents = CM.getComponents();
			var isCtrlPressed = e.ctrlKey || e.metaKey;

			e.stopPropagation();

			//Handle selecting items
			if ((!isCtrlPressed && !componentToSelect.isSelected()) || componentToSelect.getType() === componentsEnums.ARENA) {
				this.unSelectComponents(allComponents);
			}

			if (componentToSelect.getType() !== componentsEnums.ARENA) {
				this.unSelectComponentsTree(componentToSelect);

				if (isCtrlPressed) {
					componentToSelect.toggleSelection();

					app.publish('component:multi_select', {});
				} else {
					componentToSelect.select();
				}
			}
		},

		onDragStart: function(e) {
			var CM = window.CM;
			var $document = $(document);

			this.moved = false;

			//Handle selecting items
			//this.handleSelectingComponents(e);

			//Handle moving elements
			var components = CM.getSelectedComponents();

			if (!components.length) {
				return;
			}

			e.stopPropagation();

			var startX = e.pageX,
				startY = e.pageY;

			var startPositions = this.controller.getRects(components);

			app.publish('component:drag:start', {});

			$document.on('mousemove.' + eventScopeName, this.onDrag.bind(this, startX, startY, startPositions));
			$document.on('mouseup.' + eventScopeName, this.onDrop.bind(this));
		},

		onDrag: function(startX, startY, startPositions, e) {
			var selectedComponents = CM.getSelectedComponents();
			var currentX = e.pageX,
				currentY = e.pageY;

			e.preventDefault();

			this.controller.setZIndexes(selectedComponents, draggingZIndex);

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

			var currentlyHoveredElement = this.controller.getElementFromPoint(currentX, currentY);
			var hoveredElement = this.hoveredElement;

			if (hoveredElement !== currentlyHoveredElement) {
				if (hoveredElement) {
					hoveredElement.hideDropIndicator();
				}

				hoveredElement = this.hoveredElement = currentlyHoveredElement;
			}

			if (hoveredElement && hoveredElement.isDroppable() && !this.controller.isParentOfOneOfSelectedItems(hoveredElement)) {
				hoveredElement.showDropIndicator();
			}

			app.publish('component:drag', {
				components: selectedComponents,
				isFirstTick: !this.moved //'component:drag' event is fired when every single 'mousemove' event is being fired. This flag determines the first one.
			});

			this.moved = true;
		},

		onDrop: function(e) {
			var currentX = e.pageX,
				currentY = e.pageY;
			var $document = $(document);
			var selectedComponents = CM.getSelectedComponents();

			$document.off('mousemove.' + eventScopeName);
			$document.off('mouseup.' + eventScopeName);

			//Dropping elements
			if (this.moved) {
				var hoveredElement = this.controller.getElementFromPoint(currentX, currentY);

				if (hoveredElement && hoveredElement.isDroppable()) {
					hoveredElement.appendComponents(currentX, currentY, selectedComponents);
					hoveredElement.hideDropIndicator();
				}
			}

			this.controller.setZIndexes(selectedComponents, defaultZIndex);

			app.publish('component:drop', {});
		},

		onKeyboardEvents: function(e) {
			var components = CM.getSelectedComponents();
			var ctrlKey = e.ctrlKey || e.metaKey;
			var shiftKey = e.shiftKey;
			var isLeftKey = e.keyCode === keysEnums.ARROW_LEFT;
			var isUpKey = e.keyCode === keysEnums.ARROW_UP;
			var isRightKey = e.keyCode === keysEnums.ARROW_RIGHT;
			var isDownKey = e.keyCode === keysEnums.ARROW_DOWN;

			if (!isDownKey && !isLeftKey && !isRightKey && !isUpKey) {
				return;
			}

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

			app.publish('component:arrows:move', {});
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

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});