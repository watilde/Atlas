define([
	'knockout',
	'components/Component',
	'utils/AutoBind',
	'utils/CommonUtils',
	'react/navPillsAdapter',
	'text!./nav-pills.html',	
	'less!./nav-pills.less',
], function (
	ko,
	Component,
	AutoBind,
	commonUtils,
	navPillsAdapter,
	view
) {
	class NavPills extends AutoBind(Component) {
		constructor(params, componentInfo = {}) {
			super();
			this.selected = params.selected;
			this.pills = params.pills;
			this.shouldUseReact = ko.pureComputed(() => navPillsAdapter.shouldUseReact(componentInfo, params));
			this.reactConfig = ko.pureComputed(() => this.shouldUseReact()
				? navPillsAdapter.buildConfig({ pills: this.pills, selected: this.selected, onSelect: this.onSelect })
				: null);
			this.subscriptions.push(this.shouldUseReact, this.reactConfig);
		}
		
		onSelect(pillOrKey) {
			if (pillOrKey && typeof pillOrKey === 'object') {
				this.selected(pillOrKey.key);
			} else {
				this.selected(pillOrKey);
			}
		}
	}
	
	return commonUtils.build('nav-pills', NavPills, view);
});
