define('collections/components', [
	'collections/base',
	'models/base_component'
], function(
	BaseCollection,
	BaseComponentModel
) {
	'use strict';

	/*return BaseCollection.extend({
		model: BaseComponentModel,
		initialize: function(options) {
			BaseCollection.prototype.initialize.apply(this, arguments);

			this.on('add', function() {
				console.log("added");
			});
		},

		getComponent: function(id) {
			return this.findWhere({
				component_id: id
			});
		},

		destroy: function() {
			BaseCollection.prototype.destroy.apply(this, arguments);
		}
	});*/
});