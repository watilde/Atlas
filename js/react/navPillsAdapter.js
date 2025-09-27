define([
  'knockout',
  'react/NavPills',
], function (ko, NavPills) {
  function unwrapParam(flag) {
    if (typeof flag === 'undefined') {
      return undefined;
    }
    return !!ko.unwrap(flag);
  }

  function shouldUseReact(componentInfo, params) {
    const explicit = unwrapParam(params && params.useReact);
    if (typeof explicit !== 'undefined') {
      return explicit;
    }

    const element = componentInfo && componentInfo.element;
    if (element && typeof element.getAttribute === 'function') {
      return element.getAttribute('data-react') === 'true';
    }

    return false;
  }

  function toPlainPills(pills) {
    const source = typeof pills === 'function' ? pills() : pills;
    if (!source) {
      return [];
    }
    return ko.toJS(source);
  }

  function buildProps(options) {
    const pills = toPlainPills(options && options.pills);
    const selectedKey = ko.unwrap(options && options.selected);
    const originalOnSelect = options && options.onSelect;
    const onSelect = typeof originalOnSelect === 'function'
      ? function (pill, event) { originalOnSelect(pill, event); }
      : function () {};

    return {
      pills: pills,
      selectedKey: selectedKey,
      onSelect: onSelect,
    };
  }

  function buildConfig(options) {
    return {
      component: NavPills,
      props: buildProps(options),
    };
  }

  return {
    shouldUseReact: shouldUseReact,
    buildConfig: buildConfig,
  };
});
