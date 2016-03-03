define('views/arena', [
	'views/base',
	'managers/components'
], function(
	BaseView,
	componentsManager
) {
	'use strict';

	var eventScopeName = 'drag_drop';

	return BaseView.extend({
		initialize : function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {
			var $document = $(document);

			this.$el.on('mousedown.' + eventScopeName, '[draggable]', function(e) {
				var $el = $(e.currentTarget);
				var startX = e.pageX,
					startY = e.pageY,
					startRect = e.currentTarget.getBoundingClientRect(),
					component = componentsManager.getComponent($el.attr('data-component-id'));

				$document.on('mousemove.' + eventScopeName, function(e) {
					e.preventDefault();

					var currentX = e.pageX,
						currentY = e.pageY;

					$el.css({
						top: startRect.top + (currentY - startY),
						left: startRect.left + (currentX - startX)
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
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});