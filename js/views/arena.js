define('views/arena', [
	'views/base_component',
	'managers/components'
], function(
	BaseComponentView,
	componentsManager
) {
	'use strict';

	var eventScopeName = 'drag_drop';

	return BaseComponentView.extend({
		initialize : function() {
			BaseComponentView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			var $document = $(document);

			this.$el.on('mousedown.' + eventScopeName, '[draggable]', function(e) {
				var $el = $(e.currentTarget);
				var startX = e.pageX,
					startY = e.pageY,
					component = componentsManager.getComponent($el.attr('data-component-id')),
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