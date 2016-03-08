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
			var selectedComponent = options.selectedComponent;
			var elStartRect = options.elRect;
			var resizableType = selectedComponent.getResizableType();
			var elParentRect = options.elParentRect;
			var diffX = options.diffX;
			var diffY = options.diffY;
			var styles = {
				n: {
					top: elStartRect.top + diffY - elParentRect.top - 2,
					height: elStartRect.height - diffY
				},
				w: {
					width: elStartRect.width + diffX
				},
				s: {
					height: elStartRect.height + diffY
				},
				e: {
					left: elStartRect.left + diffX - elParentRect.left - 2,
					width: elStartRect.width - diffX
				}
			};

			styles.nw = $.extend({}, styles.n, styles.w);
			styles.sw = $.extend({}, styles.s, styles.w);
			styles.se = $.extend({}, styles.s, styles.e);
			styles.ne = $.extend({}, styles.n, styles.e);

			if (resizableType === 'centered-vertically') {
				styles.n = {
					height: elStartRect.height - diffY * 2,
					top: elStartRect.top + diffY - elParentRect.top - 2
				};
				styles.s = {
					height: elStartRect.height + diffY * 2,
					top: elStartRect.top - diffY - elParentRect.top - 2
				};
			} else if (resizableType === 'centered-horizontally') {
				styles.w = {
					width: elStartRect.width + diffX * 2,
					left: elStartRect.left - diffX - elParentRect.left - 2
				};
				styles.e = {
					width: elStartRect.width - diffX * 2,
					left: elStartRect.left + diffX - elParentRect.left - 2
				};
			}

			//Apply limits
			for(var side in styles) {
				if (styles.hasOwnProperty(side)) {
					if (styles[side].width) {
						styles[side].width = Math.min(Math.max(styles[side].width, selectedComponent.getMinWidth()), selectedComponent.getMaxWidth());
					}

					if (styles[side].height) {
						styles[side].height = Math.min(Math.max(styles[side].height, selectedComponent.getMinHeight()), selectedComponent.getMaxHeight());
					}

					//Element will not move when max/min width is reached
					if (styles[side].left) {
						if (styles[side].width && styles[side].width === selectedComponent.getMinWidth() || styles[side].width === selectedComponent.getMaxWidth()) {
							styles[side].left = elStartRect.left + (elStartRect.width - styles[side].width) - elParentRect.left - 2;
						}
					}

					//Element will not move when max/min height is reached
					if (styles[side].top) {
						if (styles[side].height && styles[side].height === selectedComponent.getMinHeight() || styles[side].height === selectedComponent.getMaxHeight()) {
							styles[side].top = elStartRect.top + (elStartRect.height - styles[side].height) - elParentRect.top - 2;
						}
					}
				}
			}

			return styles[options.side];
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});