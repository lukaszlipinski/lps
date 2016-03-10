define('components/button/views/main', [
	'views/base_component',
	'text!templates/components/button/default.mtpl'
], function(
	BaseComponentView,
	template
) {
	'use strict';

	return BaseComponentView.extend({
		$label: null,

		initialize : function() {
			BaseComponentView.prototype.initialize.apply(this, arguments);

			this.$label = this.$el.find('[data-label="true"]');
			this.initializeEventListeners();
		},

		initializeEventListeners: function() {

		},

		initializeContent: function() {

		},

		destroy : function() {
			BaseComponentView.prototype.destroy.apply(this, arguments);
		}
	});
});