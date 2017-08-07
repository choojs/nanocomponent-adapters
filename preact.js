var assert = require('assert')

module.exports = toPreact

function toPreact (Component, preact) {
  assert.equal(typeof Component, 'function', 'nanocomponent-adapters/preact: component should be type function')
  assert.equal(typeof preact, 'object', 'nanocomponent-adapters/preact: preact should be type object')

  var props = null
  var node = null
  var comp = new Component()

  function setRef (_node) {
    node = _node
  }

  function Clx () {
    preact.Component.apply(this, arguments)
  }

  Clx.prototype = Object.create(preact.Component)
  Clx.prototype.constructor = preact.Component

  Clx.prototype.componentDidMount = function componentDidMount () {
    if (!comp.element) {
      var el = comp.render(props)
      node.appendChild(el)
    }
  }

  Clx.prototype.componentWillReceiveProps = function componentWillReceiveProps (nwProps) {
    props = nwProps
    if (comp.element) comp.render(props)
  }

  Clx.prototype.shouldComponentUpdate = function shouldComponentUpdate () {
    return false
  }

  Clx.prototype.render = function render (_props) {
    props = _props
    return preact.h('div', { ref: setRef })
  }

  return Clx
}
