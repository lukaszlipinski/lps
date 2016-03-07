define('components/button/factories/main', [
	'components/button/views/main',
	'components/button/models/main',
	'components/button/controllers/main',
	'features/resize/factory'
], function(
	ButtonView,
	ButtonModel,
	ButtonController,
	resizeFactory
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
				parentComponent: options.parentComponent,
				features: {
					resize: resizeFactory.getInstance(options.el, options.settings.resizable)
				}
			});
		},

		getSupportedProperties: function() {
			return ButtonController.supportedProperties;
		}
	}
});
