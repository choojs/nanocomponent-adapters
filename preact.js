var assert = require('assert')

module.exports = toPreact

function toPreact (Component, preact) {
  assert.equal(typeof Component, 'function', 'nanocomponent-adapters/preact: component should be type function')
  assert.equal(typeof preact, 'object', 'nanocomponent-adapters/preact: preact should be type object')

  function Clx () {
    preact.Component.apply(this, arguments)
    this.comp = new Component()
    this.node = null
    this.setRef = this.setRef.bind(this)
  }

  Clx.prototype = Object.create(preact.Component)
  Clx.prototype.constructor = preact.Component

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
    return preact.h('div', { ref: this.setRef })
  }

  return Clx
}
