define([
	'knockout',
	'react',
	'react-dom',
], function(ko, React, ReactDOM) {
	const roots = new WeakMap();
	const supportsCreateRoot = typeof ReactDOM.createRoot === 'function';

	function getRoot(element) {
		let root = roots.get(element);
		if (!root) {
			root = supportsCreateRoot
				? ReactDOM.createRoot(element)
				: createLegacyRoot(element);
			roots.set(element, root);
		}
		return root;
	}

	function createLegacyRoot(element) {
		return {
			render(component) {
				ReactDOM.render(component, element);
			},
			unmount() {
				ReactDOM.unmountComponentAtNode(element);
			},
		};
	}

	ko.bindingHandlers.reactComponent = {
		init(element) {
			ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
				const root = roots.get(element);
				if (root) {
					root.unmount();
					roots.delete(element);
				}
			});
		},
		update(element, valueAccessor) {
			const value = ko.unwrap(valueAccessor()) || {};
			const Component = value.component;
			const propsSource = value.props || {};
			const props = propsSource ? ko.toJS(propsSource) : {};

			const root = getRoot(element);
			if (Component) {
				root.render(React.createElement(Component, props));
			} else {
				root.render(null);
			}
		},
	};
});
