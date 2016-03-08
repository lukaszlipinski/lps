define('components/button/factories/main', [
	'components/button/views/main',
	'components/button/models/main',
	'components/button/controllers/main'
], function(
	ButtonView,
	ButtonModel,
	ButtonController
) {
	return {
		getInstance: function(options) {
			var view = new ButtonView({
				el: options.el
			});

			var configModel = new ButtonModel(options.settings);

			return new ButtonController({
				view: view,
				models: {
					config: configModel
				},
				parentComponent: options.parentComponent
			});
		},

		getSupportedProperties: function() {
			return ButtonController.supportedProperties;
		}
	}
});
