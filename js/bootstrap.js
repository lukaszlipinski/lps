requirejs.config({
	baseUrl: 'js',
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		backbone : 'libs/backbone-min',
		jquery : 'libs/jquery-2.2.0.min',
		jquery_cookie: 'libs/jquery.cookie',
		underscore : 'libs/underscore-min',
		text : 'libs/text.require'
	},
	shim : {
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ['jquery', 'underscore'],
			exports: 'Backbone'
		}
	}
});


require([
	'controllers/arena',
	'views/arena',
	'jquery',
	'managers/components'
], function(
	ArenaController,
	ArenaView,
	$,
	componentsManager
) {
	'use strict';

	var $arena = $('[data-component="arena"]');

	var arena = new ArenaController({
		view: new ArenaView({
			el: $arena
		})
	});

	$arena.find('[data-component]').each(function(index, el) {
		var component = componentsManager.getComponentInstance(el);

		arena.registerElement(component);
	});



	/*arena.addElement(new ButtonComponent([
		new CssClass('button'),
		new Position(10, 10)
	]));

	arena.addElement(new ButtonComponent([
		new CssClass('button'),
		new Position(240, 10)
	]));*/
});
