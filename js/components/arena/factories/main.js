define('components/arena/factories/main', [
	'components/arena/controllers/main',
	'components/arena/views/main',
	'components/arena/models/main',
	'features/drag_drop/factory',
	'features/resize/factory'
], function(
	ArenaController,
	ArenaView,
	ArenaModel,
	dragDropFactory,
	resizeFactory
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
				features: {
					dragdrop: dragDropFactory.getInstance(options.el)
				}
			});

			return arena;
		},

		getSupportedProperties: function() {
			return ArenaController.supportedProperties;
		}
	}
});
