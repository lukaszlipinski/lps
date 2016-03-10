define('features/resize/controller', [
	'controllers/base',
	'jquery',
	'enums/resize'
], function(
	BaseController,
	$,
	resizeEnums
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		getSides: function() {
			var sides = {};

			sides[resizeEnums.HORIZONTAL] = ['w', 'e'];
			sides[resizeEnums.VERTICAL] = ['n', 's'];
			sides[resizeEnums.FULL] = ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'];
			sides[resizeEnums.DIAGONAL] = ['nw', 'sw', 'se', 'ne'];
			sides[resizeEnums.CENTERED_HORIZONTAL] = ['w', 'e'];
			sides[resizeEnums.CENTERED_VERTICAL] = ['n', 's'];

			return sides;
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
			var shiftKey = options.shiftKey;
			var selectedComponent = options.selectedComponent;
			var elStartRect = options.elRect;
			var resizeType = selectedComponent.getResizeType();
			var elParentRect = options.elParentRect;
			var diffX = options.diffX;
			var diffY = options.diffY;
			var ratio = elStartRect.height / elStartRect.width;

			var styles = {
				n: {
					top: elStartRect.top + diffY - elParentRect.top,
					height: elStartRect.height - diffY
				},
				w: {
					width: elStartRect.width + diffX
				},
				s: {
					height: elStartRect.height + diffY
				},
				e: {
					left: elStartRect.left + diffX - elParentRect.left,
					width: elStartRect.width - diffX
				}
			};

			styles.nw = $.extend({}, styles.n, styles.w);
			styles.sw = $.extend({}, styles.s, styles.w);
			styles.se = $.extend({}, styles.s, styles.e);
			styles.ne = $.extend({}, styles.n, styles.e);

			//Keep proportions
			if (shiftKey) {
				styles.sw = {
					width: elStartRect.width + diffX,
					height: elStartRect.height + diffX * ratio
				};

				styles.nw = {
					width: elStartRect.width + diffX,
					height: elStartRect.height + diffX * ratio,
					top: elStartRect.top - diffX * ratio - elParentRect.top
				};

				styles.se = {
					width: elStartRect.width - diffX,
					height: elStartRect.height - diffX * ratio,
					left: elStartRect.left + diffX - elParentRect.left
				};

				styles.ne = {
					top: elStartRect.top + diffX * ratio - elParentRect.top,
					height: elStartRect.height - diffX * ratio,
					left: elStartRect.left + diffX - elParentRect.left,
					width: elStartRect.width - diffX
				};
			}

			if (resizeType === resizeEnums.CENTERED_VERTICAL) {
				styles.n = {
					height: elStartRect.height - diffY * 2,
					top: elStartRect.top + diffY - elParentRect.top
				};
				styles.s = {
					height: elStartRect.height + diffY * 2,
					top: elStartRect.top - diffY - elParentRect.top
				};
			} else if (resizeType === resizeEnums.CENTERED_HORIZONTAL) {
				styles.w = {
					width: elStartRect.width + diffX * 2,
					left: elStartRect.left - diffX - elParentRect.left
				};
				styles.e = {
					width: elStartRect.width - diffX * 2,
					left: elStartRect.left + diffX - elParentRect.left
				};
			}

			var minW = selectedComponent.getMinWidth();
			var maxW = selectedComponent.getMaxWidth();
			var minH = selectedComponent.getMinHeight();
			var maxH = selectedComponent.getMaxHeight();

			if (shiftKey) {
				minH = minH * ratio;
				maxH = maxH * ratio;
			}

			//Apply limits
			for(var side in styles) {
				if (styles.hasOwnProperty(side)) {
					var style = styles[side];

					if (style.width) {
						style.width = Math.min(Math.max(style.width, minW), maxW);
					}

					if (style.height) {
						style.height = Math.min(Math.max(style.height, minH), maxH);
					}

					//Element will not move when max/min width is reached
					if (style.left) {
						if (style.width && style.width === minW || style.width === maxW) {
							style.left = elStartRect.left + (elStartRect.width - style.width) - elParentRect.left;
						}
					}

					//Element will not move when max/min height is reached
					if (style.top) {
						if (style.height && style.height === minH || style.height === maxH) {
							style.top = elStartRect.top + (elStartRect.height - style.height) - elParentRect.top;
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