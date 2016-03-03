define('views/base', [
	'backbone',
	'jquery',
	'underscore'
], function(
	Backbone,
	$,
	_
) {
	'use strict';

	return Backbone.View.extend({
		initialize : function(options) {
			this.templates = options.templates;

		},

		initializeEventListeners: function() {
			throw 'Please implement "initializeEventListeners"';
		},

		_getTemplate : function(name) {
			return this.templates[name];
		},

		getTemplate : function(name, data) {
			return _.template(this._getTemplate(name))(data || {});
		},

		destroy : function() {
			this.$el.off();
		}
	});
});