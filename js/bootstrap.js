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
	'jquery',
	'managers/components',
	'factories/arena'
], function(
	$,
	componentsManager,
	arenaFactory
) {
	'use strict';

	var $arena = $('[data-component="arena"]');
	var arena = arenaFactory.getInstance($arena);

	$arena.find('[data-component]').each(function(index, el) {
		var component = componentsManager.registerComponentInstance(el, arena);

		arena.registerElement(component);
	});
});
