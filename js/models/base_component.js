define('models/base_component', [
	'models/base'
], function(
	BaseModel
) {
	'use strict';

	return BaseModel.extend({
		initialize: function(options) {

		},

		getType: function() {
			return this.get('type');
		},

		isLocked: function() {
			return this.get('locked') === true;
		},

		isSelected: function() {
			return this.get('selected') === true;
		},

		select: function() {
			this.set('selected', true);
		},

		unSelect: function() {
			this.set('selected', false);
		},

		toggleSelection: function() {
			this.set('selected', !this.isSelected());
		},

		getWidth: function() {
			return this.get('width');
		},

		getHeight: function() {
			return this.get('height');
		},

		getTop: function() {
			return this.get('top');
		},

		getLeft: function() {
			return this.get('left');
		},

		getPosition: function() {
			return {
				x: this.getLeft(),
				y: this.getTop()
			}
		},

		setPosition: function(x, y) {
			console.log("set positon", x, y);
			this.set({
				left: x,
				top: y
			}, {
				silent: true
			});

			this.trigger('change:custom_position')
		},

		onPositionChange: function(obj, callback) {
			obj.listenTo(this, 'change:custom_position', callback);
		},

		onToggleSelection: function(obj, callback) {
			obj.listenTo(this, 'change:selected', callback);
		},

		destroy: function() {

		}
	});
});