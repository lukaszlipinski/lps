define('features/resize/view', [
	'views/base',
	'jquery'
], function(
	BaseView,
	$
) {
	var eventScopeName = 'resize';

	return BaseView.extend({
		$container: null,
		selectedComponent : null,
		squares: {},

		initialize: function(options) {
			BaseView.prototype.initialize.apply(this, arguments);

			this.controller = options.controller;

			this.initializeSquares();
			this.initializeEventListeners();
		},

		initializeSquares: function() {
			var sides = this.controller.getSides().both;
			var $body = $('body');

			if (!$body.find('#widget_resize').length) {
				var template = this.getTemplate('squares', {
					sides: sides
				});

				$body.append(template);
			}

			this.$container = $body.find('#widget_resize');

			for (var i = 0; i < sides.length; i++) {
				var side = sides[i];
				this.squares[side] = this.$container.find('[data-square="' + sides[i] + '"]');
			}

			this.$container.hide();
		},

		initializeEventListeners: function() {
			var $document = $(document);
			var view = this;
			var controller = view.controller;

			$document.on('mousedown', '[data-component]', function(e) {
				view.hideAllSquares();
			});

			this.$el.on('dblclick', '[data-component]', function(e) {
				e.stopPropagation();

				view.renderSquares(CM.getComponent(e.currentTarget));
			});

			this.$container.on('mousedown.' + eventScopeName, '[data-square]', function(e) {
				var startX = e.pageX,
					startY = e.pageY;

				var $square = $(e.currentTarget);
				var side = $square.attr('data-square');
				var elRect = view.selectedComponent.getRect();
				var elParentRect = view.selectedComponent.getParentComponent().getRect();

				$document.on('mousemove.' + eventScopeName, function(e) {
					var currentX = e.pageX,
						currentY = e.pageY;

					e.preventDefault();

					view.selectedComponent.resize(controller.getResizeValues({
						elRect: elRect,
						elParentRect: elParentRect,
						startX: startX,
						startY: startY,
						side: side,
						currentX: currentX,
						currentY: currentY
					}));

					view.renderSquares(view.selectedComponent);
				});

				$document.on('mouseup.' + eventScopeName, function(e) {
					$document.off('mousemove.' + eventScopeName);
					$document.off('mouseup.' + eventScopeName);
				});
			})
		},

		renderSquares: function(component) {
			var sides = this.controller.getSides();
			var resizableType = component.getResizable();

			this.selectedComponent = component;

			this.hideAllSquares();
			this.showSquares(sides[resizableType]);
		},

		showSquares: function(sides) {
			var $el = this.selectedComponent.getElement();
			var elRect = this.selectedComponent.getRect();

			$el.addClass('resizing-mode');

			this.$container.show();
			this.$container.css({
				top: elRect.top,
				left: elRect.left
			});

			for (var i = 0; i < sides.length; i++) {
				var side = sides[i];
				var $square = this.squares[side];

				$square.show();
				$square.css(this.controller.getPosition(
					side,
					elRect,
					$square[0].getBoundingClientRect()
				));
			}
		},

		hideAllSquares: function() {
			var squares = this.squares;

			for (var side in squares) {
				if (squares.hasOwnProperty(side)) {
					squares[side].hide();
				}
			}

			this.$el.removeClass('resizing-mode');
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});