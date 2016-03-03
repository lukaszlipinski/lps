define('collections/bookmarks', [
	'collections/base',
	'models/bookmark'
], function(
	BaseCollection,
	BookmarkModel
) {
	'use strict';

	return BaseCollection.extend({
		model: BookmarkModel,
		initialize: function(options) {
			BaseCollection.prototype.initialize.apply(this, arguments);
		},

		loadModels: function(models) {
			this.add(models);
		},

		hasBookmark: function(action, subAction) {
			var query = {
				bookmark_type: action
			};

			query[action + '_url'] = subAction;

			return (this.where(query)).length > 0;
		},

		getBookmark: function(action, subAction) {
			var query = {
				bookmark_type: action
			};

			query[action + '_url'] = subAction;

			return this.findWhere(query);
		},

		getList: function() {
			return this.sortBy('bookmark_type').reverse();
		},

		onBookmarksCountChange: function(obj, callback) {
			obj.listenTo(this, 'add remove', callback);
		},

		destroy: function() {
			BaseCollection.prototype.destroy.apply(this, arguments);
		}
	});
});