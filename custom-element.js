var assert = require('assert')
var xtend = require('xtend')

module.exports = toCustomElement

function toCustomElement (component, name) {
  assert.equal(typeof component, 'object', 'nanocomponent-adapters/custom-elements: component should be type object')
  assert.equal(typeof name, 'string', 'nanocomponent-adapters/custom-elements: name should be type string')

  var protoName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  protoName = 'HTML' + protoName + 'Element'
  var protoEl = window[protoName] || window.HTMLElement
  var proto = Object.create(protoEl)

  proto.createdCallback = function () {
    this.state = null
    this.component = null
  }

  proto.attachedCallback = function () {
    var nwState = {}
    if (this.hasAttributes()) {
      var attrs = this.attributes
      for (var i = 0, len = attrs.length; i < len; i++) {
        nwState[attrs[i].name] = attrs[i].value
      }
    }
    this.state = nwState

    if (!this.component) {
      this.component = component(this.state)
    } else {
      this.component(this.state)
    }
  }

  proto.detachedCallback = function () {
    this.state = null
  }

  proto.attributeChangedCallback = function (attr, old, nw) {
    var nwAttr = {}
    nwAttr[nw.name] = nw.value
    var nwState = xtend(this.state, nwAttr)
    this.state = nwState
    this.component(this.state)
  }

  return {
    prototype: Object.create(protoEl),
    extends: name
  }
}
