define('features/resize/controller', [
	'controllers/base',
	'jquery'
], function(
	BaseController,
	$
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		getType: function() {
			return this.getModel('config').getType();
		},

		getSides: function() {
			return {
				both: ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'],
				horizontally: ['w', 'e'],
				vertically: ['n', 's']
			};
		},

		getPosition: function(side, elRect, squareRect) {
			switch(side) {
				case 'n':
					return {
						top: -squareRect.height / 2,
						left: elRect.width / 2 - squareRect.width / 2
					};
				case 'nw':
					return {
						top: -squareRect.height / 2,
						left: elRect.width - squareRect.width / 2
					};
				case 'w':
					return {
						top: elRect.height / 2 - squareRect.height / 2,
						left: elRect.width - squareRect.width / 2
					};
				case 'sw':
					return {
						top: elRect.height - squareRect.height / 2,
						left: elRect.width - squareRect.width / 2
					};
				case 's':
					return {
						top: elRect.height - squareRect.height / 2,
						left:elRect.width / 2 - squareRect.width / 2
					};
				case 'se':
					return {
						top: elRect.height - squareRect.height / 2,
						left: -squareRect.width / 2
					};
				case 'e':
					return {
						top: elRect.height / 2 - squareRect.height / 2,
						left: -squareRect.width / 2
					};
				case 'ne':
					return {
						top: -squareRect.height / 2,
						left: -squareRect.width / 2
					};
			}
		},

		getResizeValues: function(options) {
			var elRect = options.elRect;
			var elParentRect = options.elParentRect;
			var sX = options.startX;
			var sY = options.startY;
			var cX = options.currentX;
			var cY = options.currentY;

			var operations = {
				n: {
					top: elRect.top + (cY - sY) - elParentRect.top - 2,
					height: elRect.height - (cY - sY)
				},
				w: {
					width: elRect.width + (cX - sX)
				},
				s: {
					height: elRect.height + (cY - sY)
				},
				e: {
					left: elRect.left + (cX - sX) - elParentRect.left - 2,
					width: elRect.width - (cX - sX)
				}
			};

			operations.nw = $.extend({}, operations.n, operations.w);
			operations.sw = $.extend({}, operations.s, operations.w);
			operations.se = $.extend({}, operations.s, operations.e);
			operations.ne = $.extend({}, operations.n, operations.e);

			return operations[options.side];
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});