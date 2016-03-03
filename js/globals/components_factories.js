define('globals/components_factories', [
	'components/arena/factories/main',
	'components/button/factories/main',
	'components/box/factories/main'
], function(
	arenaComponentFactory,
	buttonComponentFactory,
	boxComponentFactory
) {
	return {
		arena: arenaComponentFactory,
		button: buttonComponentFactory,
		box: boxComponentFactory
	};
});
