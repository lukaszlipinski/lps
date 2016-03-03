define('globals/components_factories', [
	'factories/arena',
	'components/button/factories/main',
	'components/box/factories/main'
], function(
	arenaFactory,
	buttonComponentFactory,
	boxComponentFactory
) {
	return {
		arena: arenaFactory,
		button: buttonComponentFactory,
		box: boxComponentFactory
	};
});
