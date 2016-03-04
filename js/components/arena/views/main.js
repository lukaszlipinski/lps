define('components/arena/views/main', [
	'views/base_component',
	'jquery'
], function(
	BaseComponentView,
	$
) {
	'use strict';

	var eventScopeName = 'drag_drop';

	return BaseComponentView.extend({
		initialize : function() {
			BaseComponentView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			this.initializeDragDrop();
			this.initializeSelectingElements();
		},

		initializeSelectingElements: function() {
			this.$el.on('click', '[data-component]', function(e) {
				var el = e.currentTarget;
				var component = window.CM.getComponent(el);

				component.toggleSelection();

				e.stopPropagation();
			});
		},

		initializeDragDrop: function() {
			var $document = $(document);

			this.$el.on('mousedown.' + eventScopeName, '[draggable]', function(e) {
				e.stopPropagation();

				var el = e.currentTarget;
				var $el = $(el);

				var startX = e.pageX,
					startY = e.pageY,
					component = window.CM.getComponent(el),
					componentRect = component.getRect(),
					parentComponentRect = component.getParentComponent().getRect();

				$document.on('mousemove.' + eventScopeName, function(e) {
					e.preventDefault();

					var currentX = e.pageX,
						currentY = e.pageY;

					var currentTop = componentRect.top + (currentY - startY) - parentComponentRect.top,
						currentLeft = componentRect.left + (currentX - startX) - parentComponentRect.left;

					if (component.isLocked()) {
						currentTop = Math.max(0, Math.min(parentComponentRect.height - componentRect.height, currentTop));
						currentLeft = Math.max(0, Math.min(parentComponentRect.width - componentRect.width, currentLeft));
					}

					$el.css({
						top: currentTop,
						left: currentLeft
					});
				});

				$document.on('mouseup.' + eventScopeName, function() {
					$document.off('mousemove.' + eventScopeName);
					$document.off('mouseup.' + eventScopeName);
				});
			});
		},

		render: function() {

		},

		destroy : function() {
			BaseComponentView.prototype.destroy.apply(this, arguments);
		}
	});
});