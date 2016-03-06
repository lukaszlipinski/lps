define('features/resize/factory', [
	'features/resize/controller',
	'features/resize/view',
	'text!templates/features/resize/indicators.mtpl'
], function(
	Controller,
	View,
	squaresTemplate
) {
	return {
		getInstance: function(el) {
			var view = new View({
				el: el,
				templates: {
					squares: squaresTemplate
				}
			});

			var controller = new Controller({
				view: view
			});

			view.controller = controller;

			return controller;
		}
	}
});