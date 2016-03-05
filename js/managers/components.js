define('managers/components', [
	'jquery',
	'underscore',
	'globals/components_factories'
], function(
	$,
	_,
	componentsFactories
) {
	var uniqueId = 0;
	var componentsRegister = {};

	var manager = {
		getSelectedComponents: function() {
			var selected = [];

			for(var id in componentsRegister) {
				if (componentsRegister.hasOwnProperty(id)) {
					if (componentsRegister[id].isSelected()) {
						selected.push(componentsRegister[id]);
					}
				}
			}

			return selected;
		},
		getComponents: function() {
			return componentsRegister;
		},
		getComponent: function(el) {
			var id = el.getAttribute('data-component-id');

			return componentsRegister[id];
		},
		registerComponentInstance: function(el, parentComponent) {
			var $el = $(el);
			var type = $el.attr('data-component');
			var id = 'c' + uniqueId++;
			var factory = componentsFactories[type];

			if (!factory) {
				throw 'Can not find factory for given type:' + type;
			}

			$el.attr('data-component-id', id);

			var instance = new factory.getInstance({
				el: el,
				parentComponent: parentComponent,
				settings: _.extend(this.getSettings($el, factory.getSupportedProperties()), {
					component_id: id,
					type: type
				})
			});

			componentsRegister[id] = instance;

			return instance;
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

	return manager;
});