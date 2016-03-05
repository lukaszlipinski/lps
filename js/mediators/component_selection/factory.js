define('mediators/component_selection/factory', [
	'mediators/component_selection/controller',
	'mediators/component_selection/view'
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