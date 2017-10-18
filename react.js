var assert = require('assert')

module.exports = toReact

function toReact (Component, react) {
  assert.equal(typeof Component, 'function', 'nanocomponent-adapters/react: component should be type function')
  assert.equal(typeof react, 'object', 'nanocomponent-adapters/react: react should be type object')

  var clx = react.createClass({
    getInitialState: function () {
      this.node = null
      this.comp = new Component()
      return {}
    },
    shouldComponentUpdate: function (nextProps) {
      return false
    },
    componentWillReceiveProps: function (nwProps) {
      if (this.comp.element) this.comp.render(nwProps)
    },
    componentDidMount: function () {
      if (!this.comp.element) {
        var el = this.comp.render(this.props)
        this.node.appendChild(el)
      }
    },
    setRef: function (_node) {
      this.node = _node
    },
    render: function () {
      return react.createElement('div', { ref: this.setRef })
    }
  })

  return clx
}
