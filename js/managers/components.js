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
			var components = [];

			for(var id in componentsRegister) {
				if(componentsRegister.hasOwnProperty(id)) {
					components.push(componentsRegister[id]);
				}
			}

			return components;
		},
		getComponent: function(el) {
			var id = el.getAttribute('data-component-id');

			if (!id) {
				id = $(el).parents('[data-component]')[0].getAttribute('data-component-id');
			}

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

			return settings;
		},

		getPropertyValue: function($el, propertyName, propDefinition) {
			var value = $el.attr(propertyName) || propDefinition.defaultValue;

			switch(propDefinition.type) {
				case 'boolean':
					return value === 'true';
				case 'number':
					return (value === Infinity || value === -Infinity) ? value : parseInt(value, 10);
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