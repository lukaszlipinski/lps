define('managers/components', [
	'jquery',
	'underscore',
	'globals/components'
], function(
	$,
	_,
	components
) {
	var uniqueId = 0;

	return {
		getComponentInstance: function(el) {
			var $el = $(el);
			var type = $el.attr('data-component');
			var componentDefinition = components[type];

			$el.attr('data-component-id', uniqueId);

			return new components[type]({
				el: $el,
				settings: _.extend(this.getSettings($el, componentDefinition.supportedProperties), {
					component_id: uniqueId++
				})
			});
		},

		getSettings: function($el, supportedProperties) {
			var settings = {};

			for(var supportedProperty in supportedProperties) {
				if (supportedProperties.hasOwnProperty(supportedProperty)) {
					var type = this.getPropertyName(supportedProperty);
					var value = this.getPropertyValue($el, supportedProperty, supportedProperties[supportedProperty]);

					settings[type] = value;
				}
			}

			var rect = $el[0].getBoundingClientRect();

			settings.left = rect.left;
			settings.top = rect.top;
			settings.width = rect.width;
			settings.height = rect.height;

			return settings;
		},

		getPropertyValue: function($el, property, valType) {
			var value = $el.attr(property);

			switch(valType) {
				case 'boolean':
					return value === 'true';
				case 'number':
					return parseInt(value, 10);
				default:
					return value;
			}
		},

		getPropertyName: function(supportedProperty) {
			var part = supportedProperty.split('-');

			return part[1];
		}
	};
});