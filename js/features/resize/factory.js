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
			var controller = new Controller({

			});

			var view = new View({
				el: el,
				controller: controller,
				templates: {
					squares: squaresTemplate
				}
			});

			return controller;
		}
	}
});