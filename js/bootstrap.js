requirejs.config({
	baseUrl: 'js',
	urlArgs: "bust=" + new Date().getTime(),
	paths: {
		backbone : 'libs/backbone-min',
		jquery : 'libs/jquery-2.2.0.min',
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
	'polyfills/array_includes',
	'libs/plugins/closest_descendent'
], function(
	$,
	componentsManager,
	voidPolyfillArrayIncludes,
	voidJQueryClosestDescendent
) {
	'use strict';

	window.CM = componentsManager;

	function getComponentsTree(el, type) {
		var found = [];
		var children = el.children;

		for (var i = 0; i < children.length; i++) {
			var child = children[i];

			if (child.getAttribute(type) !== null) {
				found.push({
					parent: el,
					child: child
				});
			}

			found = found.concat(getComponentsTree(child, type));
		}

		return found;
	}

	var arena = document.querySelector('[data-component="arena"]');

	//Register arena
	var arenaComponent = componentsManager.registerComponentInstance(arena, null);

	//Register all components inside it
	var found = getComponentsTree(arena, 'data-component');

	found.forEach(function(item, index) {
		componentsManager.registerComponentInstance(
			item.child,
			componentsManager.getComponent(item.parent)
		);
	});
});
