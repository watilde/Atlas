(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['react'], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('react'));
  } else {
    root.NavPills = factory(root.React);
  }
})(this, function (React) {
  /**
   * README
   * -------
   * This NavPills component mirrors the legacy Knockout template that renders a tab-like pill list.
   * KO still owns data flow and lifecycle: the adapter converts KO observables into plain props and
   * the shared `reactComponent` binding (see js/extensions/bindings/reactComponent.js) mounts it via
   * `ReactDOM.createRoot`. To migrate the next widget, copy this pattern: keep KO data as the source
   * of truth, wrap the React view in an adapter, and gate activation behind a `data-react` opt-in.
   */

  const BLOCK = 'nav-pills';
  const NAV_CLASS = BLOCK + '__nav nav nav-pills';

  function getPillClass(isActive) {
    return isActive ? BLOCK + '__nav-pill active' : BLOCK + '__nav-pill';
  }

  function renderPill(pill, selectedKey, onSelect, index) {
    const key = pill && pill.key != null ? pill.key : index;
    const name = pill && pill.name != null ? pill.name : '';
    const isActive = key === selectedKey;
    const handleClick = function (event) {
      if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof onSelect === 'function') {
        onSelect(pill, event);
      }
    };

    return React.createElement(
      'li',
      {
        key: key,
        role: 'presentation',
        className: getPillClass(isActive),
        onClick: handleClick,
      },
      React.createElement('a', null, name)
    );
  }

  function NavPills(props) {
    const pills = Array.isArray(props && props.pills) ? props.pills : [];
    const selectedKey = props ? props.selectedKey : undefined;
    const onSelect = props ? props.onSelect : undefined;

    return React.createElement(
      'ul',
      {
        className: NAV_CLASS,
        role: 'tablist',
      },
      pills.map(function (pill, index) {
        return renderPill(pill, selectedKey, onSelect, index);
      })
    );
  }

  return NavPills;
});
