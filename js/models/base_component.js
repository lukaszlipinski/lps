define('models/base_component', [
	'models/base'
], function(
	BaseModel
) {
	'use strict';

	return BaseModel.extend({
		initialize: function(options) {

		},

		getResizable: function() {
			return this.get('resizable');
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

		isDroppable: function() {
			return this.get('dropeffect') && this.get('dropeffect') !== 'none';
		},

		getZIndex: function() {
			return this.get('zindex');
		},

		setZIndex: function(value) {
			this.set('zindex', value);
		},

		show: function() {
			this.set('visible', true);
		},

		hide: function() {
			this.set('visible', false);
		},

		isVisible: function() {
			return this.get('visible') === true;
		},

		onVisibilityChange: function(obj, callback) {
			obj.listenTo(this, 'change:visible', callback);
		},

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