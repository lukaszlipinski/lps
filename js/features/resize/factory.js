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
			var view = new View({
				el: el,
				templates: {
					squares: squaresTemplate
				}
			});

			var controller = new Controller({
				view: view,
				models: {
					config: new Model({
						resizable: propertyValue
					})
				}
			});

			view.controller = controller;

			return controller;
		}
	}
});