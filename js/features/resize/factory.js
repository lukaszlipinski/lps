define('features/resize/factory', [
	'features/resize/controller',
	'features/resize/view'
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