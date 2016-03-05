define('components/arena/factories/main', [
	'components/arena/controllers/main',
	'components/arena/views/main',
	'components/arena/models/main',
	'mediators/component_selection/factory'
], function(
	ArenaController,
	ArenaView,
	ArenaModel,
	componentSelectionFactory
) {
	return {
		getInstance: function(options) {
			var view = new ArenaView({
				el: options.el
			});

			var configModel = new ArenaModel(options.settings);

			var arena = new ArenaController({
				parentComponent: options.parentComponent,
				view: view,
				models: {
					config: configModel
				},
				features: [
					componentSelectionFactory.getInstance(options.el)
				]
			});

			return arena;
		},

		getSupportedProperties: function() {
			return ArenaController.supportedProperties;
		}
	}
});
