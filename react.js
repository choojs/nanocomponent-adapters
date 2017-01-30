var assert = require('assert')

module.exports = toReact

function toReact (component, react) {
  assert.equal(typeof component, 'function', 'nanocomponent-adapters/react: component should be type function')
  assert.equal(typeof react, 'object', 'nanocomponent-adapters/react: react should be type object')

  var element = null
  var props = null
  var node = null

  var clx = react.createClass({
    shouldComponentUpdate: function (nextProps) {
      return false
    },
    componentWillReceiveProps: function (nwProps) {
      props = nwProps
      if (element) element(props)
    },
    componentDidMount: function () {
      if (!element) {
        element = component(props)
        node.appendChild(element)
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
