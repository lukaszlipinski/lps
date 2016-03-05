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
			var view = this;
			var $document = $(document);

			this.$el.on('mousedown.' + eventScopeName, '[draggable="true"]', function(e) {
				var el = e.currentTarget;

				e.stopPropagation();

				var startX = e.pageX,
					startY = e.pageY;

				$document.on('mousemove.' + eventScopeName, function(e) {
					e.preventDefault();

					var currentX = e.pageX,
						currentY = e.pageY;

					view.trigger('component:move', {
						diffX: currentX - startX,
						diffY: currentY - startY
					});
				});

				$document.on('mouseup.' + eventScopeName, function(e) {
					var currentX = e.pageX,
						currentY = e.pageY;

					$document.off('mousemove.' + eventScopeName);
					$document.off('mouseup.' + eventScopeName);

					view.trigger('component:move:stop', {
						diffX: currentX - startX,
						diffY: currentY - startY
					});
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