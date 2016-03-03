define('factories/arena_controller', [
	'controllers/arena',
	'views/arena',
	'jquery'
], function(
	ArenaController,
	ArenaView,
	$
) {
	return {
		getInstance: function() {
			var view = new ArenaView({
				el: $('body')
			});

			var controller = new ArenaController({
				view: view
			});

			return controller;
		}
	};
});
