define('components/box/factories/main', [
	'components/box/views/main',
	'components/box/models/main',
	'components/box/controllers/main'
], function(
	BoxView,
	BoxModel,
	BoxController
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
				parentComponent: options.parentComponent
			});
		},

		getSupportedProperties: function() {
			return BoxController.supportedProperties;
		}
	}
});
