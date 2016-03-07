define('features/resize/view', [
	'views/base',
	'jquery'
], function(
	BaseView,
	$
) {

	return BaseView.extend({
		$container: null,
		squares: {},

		initialize: function() {
			BaseView.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		renderSquares: function(sides) {
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
			this.$el.on('dblclick', this.onDblClick.bind(this));
		},

		render: function(sides) {
			this.hideAllSquares();
			this.showSquares(sides);
		},

		showSquares: function(sides) {
			//var rect = this.el.

			for (var i = 0; i < sides.length; i++) {
				var side = sides[i];

				this.squares[side].css(this.getPosition(side)).show();
			}
		},

		getPosition: function(side) {
			return {
				left: 0,
				top:0
			}
		},

		hideAllSquares: function() {
			var squares = this.squares;

			for (var side in squares) {
				if (squares.hasOwnProperty(side)) {
					squares[side].hide();
				}
			}
		},

		onDblClick: function() {
			this.trigger('el:dblclick', {});
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});