define('mediators/drag_drop/factory', [
	'mediators/drag_drop/controller',
	'mediators/drag_drop/view'
], function(
	Controller,
	View
) {
	return {
		getInstance: function(el) {
			var view = new View({
				el: el
			});

			return new Controller({
				view: view
			})
		}
	}
});