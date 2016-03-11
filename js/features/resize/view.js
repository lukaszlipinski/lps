define('features/resize/view', [
	'views/base',
	'jquery',
	'common/app',
	'enums/components',
	'enums/resize'
], function(
	BaseView,
	$,
	app,
	enumsComponents,
	enumsResize
) {
	var eventScopeName = 'resize';

	return BaseView.extend({
		$container: null,
		$currentSizeIndicator: null,

		selectedComponent : null,
		squares: {},

		initialize: function(options) {
			BaseView.prototype.initialize.apply(this, arguments);

			this.controller = options.controller;

			this.createSquares();
			this.initializeEventListeners();
		},

		createSquares: function() {
			var sides = this.controller.getSides()[enumsResize.FULL];
			var $body = $('body');

			if (!$body.find('#widget_resize').length) {
				var template = this.getTemplate('squares', {
					sides: sides
				});

				$body.append(template);
			}

			this.$container = $body.find('#widget_resize');
			this.$currentSizeIndicator = this.$container.find('.size-indicator');

			for (var i = 0; i < sides.length; i++) {
				var side = sides[i];
				this.squares[side] = this.$container.find('[data-square="' + sides[i] + '"]');
			}

			this.$container.hide();
			this.$currentSizeIndicator.hide();
		},

		initializeEventListeners: function() {
			var $document = $(document);
			var $container = this.$container;

			$document.on('mousedown', '[data-component]', this.onSelectComponent.bind(this));
			$container.on('mousedown.' + eventScopeName, '[data-square]', this.onResizeStart.bind(this));

			app.subscribe('component:drag', function(e, data) {
				if (data.isFirstTick) {
					this.hideAllSquares();
				}
			}.bind(this));

			app.subscribe('component:multi_select', function(e, data) {
				this.hideAllSquares();
			}.bind(this));

			app.subscribe('component:arrows:move', function(e, data) {
				this.hideAllSquares();
			}.bind(this));
		},

		renderSquares: function(component) {
			var sides = this.controller.getSides();
			var resizeType = component.getResizeType();

			this.selectedComponent = component;

			this.showSquares(sides[resizeType]);
		},

		renderCurrentSizeIndicator: function() {
			var rect = this.selectedComponent.getRect();

			this.$currentSizeIndicator.html(parseInt(rect.width, 10) + 'x' + parseInt(rect.height, 10)).show();
		},

		showSquares: function(sides) {
			var $el = this.selectedComponent.getElement();
			var elRect = this.selectedComponent.getRect();

			this.hideAllSquares();

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

			if (this.selectedComponent) {
				var $el = this.selectedComponent.getElement();

				$el.removeClass('resizing-mode');
			}
		},

		onSelectComponent: function(e) {
			var ctrlKey = e.ctrlKey || e.metaKey;
			var component = CM.getComponent(e.currentTarget);

			if (ctrlKey || component.getType() === enumsComponents.ARENA || this.controller.areMultipleComponentsSelected()) {
				this.hideAllSquares();
				return;
			}

			this.renderSquares(component);
		},

		onResizeStart: function(e) {
			var $document = $(document);

			app.publish('component:resize:start', {});

			$document.on('mousemove.' + eventScopeName, this.onResize.bind(this,
				e.pageX,
				e.pageY,
				this.selectedComponent.getRect(),
				this.selectedComponent.getParentComponent().getRect(),
				$(e.currentTarget).attr('data-square')
			));

			$document.on('mouseup.' + eventScopeName, this.onResizeStop.bind(this));
		},

		onResize: function(startX, startY, elStartRect, elParentRect, side, e) {
			var currentX = e.pageX,
				currentY = e.pageY;

			app.publish('component:resize:start', {});

			e.preventDefault();

			this.selectedComponent.resize(this.controller.getResizeValues({
				shiftKey: e.shiftKey,
				selectedComponent: this.selectedComponent,
				elRect: elStartRect,
				elParentRect: elParentRect,
				diffX: currentX - startX,
				diffY: currentY - startY,
				side: side
			}));

			this.renderSquares(this.selectedComponent);
			this.renderCurrentSizeIndicator();
		},

		onResizeStop: function(e) {
			var $document = $(document);

			$document.off('mousemove.' + eventScopeName);
			$document.off('mouseup.' + eventScopeName);

			app.publish('component:resize:stop', {});

			this.$currentSizeIndicator.hide();
		},

		destroy: function() {
			BaseView.prototype.destroy.apply(this, arguments);
		}
	});
});