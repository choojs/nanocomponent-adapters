var assert = require('assert')

module.exports = toReact

function toReact (Component, react) {
  assert.equal(typeof Component, 'function', 'nanocomponent-adapters/react: component should be type function')
  assert.equal(typeof react, 'object', 'nanocomponent-adapters/react: react should be type object')

  function Clx () {
    react.Component.apply(this, arguments)
    this.comp = new Component()
    this.node = null
    this.setRef = this.setRef.bind(this)
  }

  Clx.prototype = Object.create(react.Component.prototype)
  Clx.prototype.constructor = react.Component

  Clx.prototype.componentDidMount = function componentDidMount () {
    if (!this.comp.element) {
      var el = this.comp.render(this.props)
      this.node.appendChild(el)
    }
  }

  Clx.prototype.setRef = function (_node) {
    this.node = _node
  }

  Clx.prototype.componentWillReceiveProps = function componentWillReceiveProps (props) {
    if (this.comp.element) this.comp.render(props)
  }

  Clx.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
    return false
  }

  Clx.prototype.render = function render (props) {
    return react.createElement('div', { ref: this.setRef })
  }

  return Clx
}
