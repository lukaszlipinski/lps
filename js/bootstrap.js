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
	'components/button',
	'prototypes/position',
	'prototypes/css_class'
], function(
	ArenaController,
	ArenaView,
	$,
	ButtonComponent,
	Position,
	CssClass
) {
	'use strict';

	var $arena = $('[data-component="arena"]');

	var arena = new ArenaController({
		view: new ArenaView({
			el: $arena
		})
	});



	arena.addElement(new ButtonComponent([
		new CssClass('button'),
		new Position(10, 10)
	]));

	arena.addElement(new ButtonComponent([
		new CssClass('button'),
		new Position(240, 10)
	]));
});
