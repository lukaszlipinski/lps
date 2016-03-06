define('models/base_component', [
	'models/base'
], function(
	BaseModel
) {
	'use strict';

	return BaseModel.extend({
		initialize: function(options) {

		},

		getId: function() {
			return this.get('component_id');
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

		isDroppable: function() {
			return this.get('dropeffect') && this.get('dropeffect') !== 'none';
		},

		getZIndex: function() {
			return this.get('zindex');
		},

		setZIndex: function(value) {
			this.set('zindex', value);
		},

		setPosition: function(x, y) {
			this.set({
				left: x,
				top: y
			}, {
				silent: true
			});
		},

		/*onPositionChange: function(obj, callback) {
			obj.listenTo(this, 'change:custom_position', callback);
		},*/

		onZIndexChange: function(obj, callback) {
			obj.listenTo(this, 'change:zindex', callback);
		},

		onToggleSelection: function(obj, callback) {
			obj.listenTo(this, 'change:selected', callback);
		},

		destroy: function() {

		}
	});
});