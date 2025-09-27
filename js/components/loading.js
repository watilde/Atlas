define([
	'knockout',
	'react',
	'text!./loading.html',
], function(ko, React, view) {
	const containerStyles = {
		width: '400px',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: '25px',
		paddingBottom: '25px',
		textAlign: 'center',
	};

	const svgStyles = {
		width: '100px',
		height: '100px',
	};

	const statusStyles = {
		textAlign: 'center',
	};

	const LoadingView = ({ status }) => {
		const ringChildren = [
			React.createElement('circle', {
				key: 'outer-ring',
				cx: 205,
				cy: 17,
				r: 165,
				stroke: '#21425a',
				fill: 'none',
				strokeWidth: '15px',
			}),
			React.createElement('ellipse', {
				key: 'inner-ring-70',
				cx: 205,
				cy: 17,
				rx: 70,
				ry: 70,
				stroke: '#f28b1b',
				fill: 'none',
				strokeWidth: '6px',
				strokeOpacity: '0.8',
			},
				React.createElement('animate', {
					key: 'inner-ring-70-rx-1',
					attributeName: 'rx',
					begin: '0s',
					dur: '4s',
					values: '70;1;70',
					calcMode: 'linear',
					repeatCount: 'indefinite',
				}),
				React.createElement('animate', {
					key: 'inner-ring-70-rx-2',
					attributeName: 'rx',
					begin: '0s',
					dur: '4s',
					values: '70;1;70',
					calcMode: 'linear',
					repeatCount: 'indefinite',
				}),
				React.createElement('animateTransform', {
					key: 'inner-ring-70-rotate',
					attributeName: 'transform',
					type: 'rotate',
					from: '0 205 17',
					to: '180 205 17',
					dur: '2s',
					repeatCount: 'indefinite',
				})
			),
			React.createElement('ellipse', {
				key: 'inner-ring-100',
				cx: 205,
				cy: 17,
				rx: 100,
				ry: 100,
				stroke: '#21425a',
				fill: 'none',
				strokeWidth: '10px',
				strokeOpacity: '0.8',
			},
				React.createElement('animate', {
					key: 'inner-ring-100-rx-1',
					attributeName: 'rx',
					begin: '0s',
					dur: '6s',
					values: '100;1;100',
					calcMode: 'linear',
					repeatCount: 'indefinite',
				}),
				React.createElement('animate', {
					key: 'inner-ring-100-rx-2',
					attributeName: 'rx',
					begin: '0s',
					dur: '6s',
					values: '100;1;100',
					calcMode: 'linear',
					repeatCount: 'indefinite',
				}),
				React.createElement('animateTransform', {
					key: 'inner-ring-100-rotate',
					attributeName: 'transform',
					type: 'rotate',
					from: '0 205 17',
					to: '180 205 17',
					dur: '3s',
					repeatCount: 'indefinite',
				})
			),
			React.createElement('ellipse', {
				key: 'inner-ring-135',
				cx: 205,
				cy: 17,
				rx: 135,
				ry: 135,
				stroke: '#ccc',
				fill: 'none',
				strokeWidth: '12px',
				strokeOpacity: '0.8',
			},
				React.createElement('animate', {
					key: 'inner-ring-135-rx-1',
					attributeName: 'rx',
					begin: '0s',
					dur: '4s',
					values: '130;1;130',
					calcMode: 'linear',
					repeatCount: 'indefinite',
				}),
				React.createElement('animate', {
					key: 'inner-ring-135-rx-2',
					attributeName: 'rx',
					begin: '0s',
					dur: '4s',
					values: '130;1;130',
					calcMode: 'linear',
					repeatCount: 'indefinite',
				}),
				React.createElement('animateTransform', {
					key: 'inner-ring-135-rotate',
					attributeName: 'transform',
					type: 'rotate',
					from: '0 205 17',
					to: '180 205 17',
					dur: '8s',
					repeatCount: 'indefinite',
				})
			)
		];

		const svg = React.createElement(
			'svg',
			{
				style: svgStyles,
				version: '1.1',
				xmlns: 'http://www.w3.org/2000/svg',
				xmlnsXlink: 'http://www.w3.org/1999/xlink',
				viewBox: '10 -200 400 400',
				xmlSpace: 'preserve',
			},
			React.createElement('g', { id: 'rings' }, ringChildren)
		);

		const statusNode = React.createElement('div', {
			style: statusStyles,
			dangerouslySetInnerHTML: { __html: status || '' },
		});

		return React.createElement('div', { style: containerStyles }, svg, statusNode);
	};

	function Loading(params) {
		this.status = params.status || ko.i18n('common.loading', 'Loading');
		this.view = LoadingView;
		this.componentProps = ko.pureComputed(() => ({
			status: String(ko.unwrap(this.status) || ''),
		}));
		this.disposables = [this.componentProps];
	}

	Loading.prototype.dispose = function() {
		this.disposables
			.filter(disposable => disposable && typeof disposable.dispose === 'function')
			.forEach(disposable => disposable.dispose());
	};

	const component = {
		viewModel: Loading,
		template: view,
	};

	ko.components.register('loading', component);
	return component;
});
