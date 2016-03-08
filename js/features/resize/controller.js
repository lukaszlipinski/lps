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

		getSides: function() {
			return {
				'fully': ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'],
				'horizontally': ['w', 'e'],
				'vertically': ['n', 's'],
				'diagonally': ['nw', 'sw', 'se', 'ne'],
				'centered-horizontally': ['w', 'e'],
				'centered-vertically': ['n', 's']
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
			var resizableType = options.resizableType;
			var elParentRect = options.elParentRect;
			var diffX = options.diffX;
			var diffY = options.diffY;
			var operations = {
				n: {
					top: elRect.top + diffY - elParentRect.top - 2,
					height: elRect.height - diffY
				},
				w: {
					width: elRect.width + diffX
				},
				s: {
					height: elRect.height + diffY
				},
				e: {
					left: elRect.left + diffX - elParentRect.left - 2,
					width: elRect.width - diffX
				}
			};

			operations.nw = $.extend({}, operations.n, operations.w);
			operations.sw = $.extend({}, operations.s, operations.w);
			operations.se = $.extend({}, operations.s, operations.e);
			operations.ne = $.extend({}, operations.n, operations.e);

			if (resizableType === 'centered-vertically') {
				operations.n = {
					height: elRect.height - diffY * 2,
					top: elRect.top + diffY - elParentRect.top - 2
				};
				operations.s = {
					height: elRect.height + diffY * 2,
					top: elRect.top - diffY - elParentRect.top - 2
				};
			} else if (resizableType === 'centered-horizontally') {
				operations.w = {
					width: elRect.width + diffX * 2,
					left: elRect.left - diffX - elParentRect.left - 2
				};
				operations.e = {
					width: elRect.width - diffX * 2,
					left: elRect.left + diffX - elParentRect.left - 2
				};
			}

			return operations[options.side];
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});