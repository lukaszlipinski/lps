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

			var controller = new Controller({
				view: view
			});

			view.controller = controller;

			return controller;
		}
	}
});