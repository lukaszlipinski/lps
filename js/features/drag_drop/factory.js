define('features/drag_drop/factory', [
	'features/drag_drop/controller',
	'features/drag_drop/view'
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