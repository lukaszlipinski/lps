define('models/base_component', [
	'models/base'
], function(
	BaseModel
) {
	'use strict';

	return BaseModel.extend({
		initialize: function(options) {

		},

		isLocked: function() {
			return this.get('locked') === true;
		},

		isSelected: function() {
			return this.get('selected') === true;
		},

		toggleSelection: function() {
			this.set('selected', !this.isSelected());
		},

		onToggleSelection: function(obj, callback) {
			obj.listenTo(this, 'change:selected', callback);
		},

		destroy: function() {

		}
	});
});