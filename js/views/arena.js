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
					//startRect = e.currentTarget.getBoundingClientRect(),
					component = componentsManager.getComponent($el.attr('data-component-id')),
					startRect = component.getRect(),
					parentComponentRect = component.getParentComponent().getRect();

				console.log(component.isLocked());

				$document.on('mousemove.' + eventScopeName, function(e) {
					e.preventDefault();

					var currentX = e.pageX,
						currentY = e.pageY;

					$el.css({
						top: startRect.top + (currentY - startY) - parentComponentRect.top,
						left: startRect.left + (currentX - startX) - parentComponentRect.left
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