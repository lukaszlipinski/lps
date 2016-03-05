define('mediators/drag_drop/view', [
	'views/base',
	'jquery'
], function(
	BaseView,
	$
) {
	var eventScopeName = 'drag_drop';

	return BaseView.extend({
		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			var $document = $(document);

			this.$el.on('mousedown.' + eventScopeName, '[draggable]', function(e) {
				var el = e.currentTarget;
				var $el = $(el);

				e.stopPropagation();

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

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});