define('features/resize/controller', [
	'controllers/base'
], function(
	BaseController
) {
	return BaseController.extend({
		initialize: function() {
			BaseController.prototype.initialize.apply(this, arguments);

			this.initializeEventListeners();
			this.view.renderSquares(this.getSides().both);
		},

		initializeEventListeners: function() {
			this.view.on('el:dblclick', this.onDblClick.bind(this));
		},

		getType: function() {
			return this.getModel('config').getType();
		},

		getSides: function() {
			return {
				both: ['n', 'nw', 'w', 'sw', 's', 'se', 'e', 'ne'],
				horizontally: [],
				vertically: []
			};
		},

		onDblClick: function() {
			var sides = this.getSides();
			var type = this.getType();

			this.view.render(sides[type]);
		},

		destroy: function() {
			BaseController.prototype.destroy.apply(this, arguments);
		}
	});
});