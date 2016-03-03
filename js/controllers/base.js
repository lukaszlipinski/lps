define('controllers/base', [
	'backbone',
	'jquery'
], function(
	Backbone,
	$
) {
	'use strict';

	return Backbone.View.extend({
		view: null,
		collections: {},
		models: {},
		strategies: {},

		initialize : function(options) {
			this.view = options.view || null;
			this.collections = options.collections || {};
			this.models = options.models || {};
			this.strategies = options.strategies || {};
		},

		getCollection : function(name) {
			return this.collections[name];
		},

		getModel : function(name) {
			return this.models[name];
		},

		getStrategy : function(name) {
			return this.strategies[name];
		},

		destroy : function() {
			this.view.destroy();
			this.view = null;
		}
	});
});