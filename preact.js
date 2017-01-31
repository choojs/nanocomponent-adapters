var assert = require('assert')

module.exports = toPreact

function toPreact (component, preact) {
  assert.equal(typeof component, 'function', 'nanocomponent-adapters/preact: component should be type function')
  assert.equal(typeof preact, 'object', 'nanocomponent-adapters/preact: preact should be type object')

  var element = null
  var props = null
  var node = null

  function setRef (_node) {
    node = _node
  }

  function Clx () {
    preact.Component.apply(this, arguments)
  }

  Clx.prototype = Object.create(preact.Component)
  Clx.prototype.constructor = preact.Component

  Clx.prototype.componentDidMount = function componentDidMount () {
    if (!element) {
      element = component(props)
      node.appendChild(element)
    }
  }

  Clx.prototype.componentWillReceiveProps = function componentWillReceiveProps (nwProps) {
    props = nwProps
    if (element) element(props)
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
