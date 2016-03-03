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
		getInstance: function($el) {
			var view = new ArenaView({
				el: $el
			});

			var configModel = new ArenaModel({
				type: 'arena'
			});

			var arena = new ArenaController({
				view: view,
				models: {
					config: configModel
				}
			});

			return arena;
		}
	}
});
