define('factories/arena', [
	'controllers/arena',
	'views/arena',
	'models/arena'
], function(
	ArenaController,
	ArenaView,
	ArenaModel
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
				}
			});

			return arena;
		},

		getSupportedProperties: function() {
			return ArenaController.supportedProperties;
		}
	}
});
