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
		squares: {},

		initialize: function(options) {
			BaseView.prototype.initialize.apply(this, arguments);

			this.controller = options.controller;

			this.renderSquares();
			this.initializeEventListeners();
		},

		renderSquares: function() {
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

			$document.on('mousedown', '[data-component]', function() {
				view.hideAllSquares();
			});

			this.$el.on('dblclick', this.onDblClick.bind(this));

			this.$container.on('mousedown.' + eventScopeName, '[data-square]', function(e) {
				var startX = e.pageX,
					startY = e.pageY;

				var $square = $(e.currentTarget);
				var type = $square.attr('data-square');

				$document.on('mousemove.' + eventScopeName, function(e) {
					var currentX = e.pageX,
						currentY = e.pageY;

					e.preventDefault();

					//currentY - startY


				});

				$document.on('mouseup.' + eventScopeName, function(e) {
					$document.off('mousemove.' + eventScopeName);
					$document.off('mouseup.' + eventScopeName);
				});
			})
		},

		render: function(sides) {
			this.hideAllSquares();
			this.showSquares(sides);
		},

		showSquares: function(sides) {
			var elRect = this.el.getBoundingClientRect();

			this.$container.show();
			this.$el.addClass('resizing-mode');
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

		onDblClick: function() {
			var sides = this.controller.getSides();
			var type = this.controller.getType();

			this.render(sides[type]);
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});