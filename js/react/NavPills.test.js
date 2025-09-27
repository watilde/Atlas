const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const NavPills = require('./NavPills');

describe('NavPills', () => {
  it('renders a nav list with the active pill highlighted', () => {
    const markup = ReactDOMServer.renderToStaticMarkup(
      React.createElement(NavPills, {
        pills: [
          { key: 'one', name: 'One' },
          { key: 'two', name: 'Two' },
        ],
        selectedKey: 'two',
        onSelect: () => {},
      })
    );

    assert.ok(markup.includes('class="nav-pills__nav nav nav-pills"'), 'nav list uses expected CSS classes');
    assert.ok(markup.includes('class="nav-pills__nav-pill active"'), 'active pill is highlighted');
    assert.ok(markup.includes('Two'), 'selected pill label is rendered');
  });
});
