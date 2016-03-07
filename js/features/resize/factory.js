define('features/resize/factory', [
	'features/resize/controller',
	'features/resize/view',
	'features/resize/model',
	'text!templates/features/resize/indicators.mtpl'
], function(
	Controller,
	View,
	Model,
	squaresTemplate
) {
	return {
		getInstance: function(el, propertyValue) {
			var controller = new Controller({
				models: {
					config: new Model({
						resizable: propertyValue
					})
				}
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