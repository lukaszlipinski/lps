define('components/box/factories/main', [
	'components/box/views/main',
	'components/box/models/main',
	'components/box/controllers/main',
	'features/resize/factory'
], function(
	BoxView,
	BoxModel,
	BoxController,
	resizeFactory
) {
	return {
		getInstance: function(options) {
			var view = new BoxView({
				el: options.el
			});

			var configModel = new BoxModel(options.settings);

			return new BoxController({
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
			return BoxController.supportedProperties;
		}
	}
});
