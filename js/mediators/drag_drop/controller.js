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

		},

		getRootElement: function() {
			var components = CM.getComponents();

			for(var i = 0; i < components.length; i++) {
				if (components[i].getParentComponent() === null) {
					return components[i];
				}
			}

			throw 'No root element. This should not happend';
			return null;
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

		getRootElement: function() {
			var components = CM.getComponents();

			for(var i = 0; i < components.length; i++) {
				if (components[i].getParentComponent() === null) {
					return components[i];
				}
			}

			throw 'No root element. This should not happend';
			return null;
		},

		getChildren: function(component) {
			var components = CM.getComponents();
			var children = [];

			for(var i = 0; i < components.length; i++) {
				if (components[i].getParentComponent() === component) {
					children.push(components[i]);
				}
			}

			return children;
		},

		getEmptyMap: function() {
			var rootRect = this.getRootElement().getRect();
			var map = [];

			for(var i = 0; i < rootRect.top + rootRect.height; i++) {
				map[i] = [];

				for(var j = 0; j < rootRect.left + rootRect.width; j++) {
					map[i][j] = null;
				}
			}

			return map;
		},

		addToMap: function(map, rect, status) {
			for(var i = rect.top; i < rect.top + rect.height; i++) {
				for(var j = rect.left; j < rect.left + rect.width; j++) {
					map[i][j] = status;
				}
			}
		},

		generateMap: function(map, rootComponent, selectedItemsParent) {
			var children = this.getChildren(rootComponent);

			if (selectedItemsParent !== rootComponent && rootComponent.isDroppable()) {
				this.addToMap(map, rootComponent.getRect(), 'd');
			}

			for(var i = 0; i < children.length; i++) {
				var child = children[i];

				if (child.isDroppable()) {
					this.addToMap(map, child.getRect(), 'd');
				} else {
					this.addToMap(map, child.getRect(), 0);
				}

				this.generateMap(map, child, selectedItemsParent);
			}
		},

		isOverDroppableItem: function(map, x, y) {
			if (map[y][x] === 'd') {
				return true;
			}

			return false;
		},

		setZIndexes: function(components, value) {
			components.forEach(function(item) {
				item.setZIndex(value);
			});
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});