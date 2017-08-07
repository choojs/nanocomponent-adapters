var assert = require('assert')

module.exports = toReact

function toReact (Component, react) {
  assert.equal(typeof Component, 'function', 'nanocomponent-adapters/react: component should be type function')
  assert.equal(typeof react, 'object', 'nanocomponent-adapters/react: react should be type object')

  var props = null
  var node = null
  var comp = new Component()

  var clx = react.createClass({
    shouldComponentUpdate: function (nextProps) {
      return false
    },
    componentWillReceiveProps: function (nwProps) {
      props = nwProps
      if (comp.element) comp.render(props)
    },
    componentDidMount: function () {
      if (!comp.element) {
        var el = comp.render(props)
        node.appendChild(el)
      }
    },
    setRef: function (_node) {
      node = _node
    },
    render: function () {
      props = this.props
      return react.createElement('div', { ref: this.setRef })
    }
  })

  return clx
}
