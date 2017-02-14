var assert = require('assert')
var xtend = require('xtend')

module.exports = toCustomElement

function toCustomElement (component, attrs) {
  if (!attrs) { attrs = []; }
  assert.equal(typeof component, 'function', 'nanocomponent-adapters/custom-elements: component should be type object')
  assert.equal(typeof attrs, 'object', 'nanocomponent-adapters/custom-elements-v1: attrs should be type Array');

  var createdCallback = function () {
    this.state = null
    this.component = null
  }

  var attachedCallback = function () {
    var newState = {};
    if (this.hasAttributes()) {
      var mattrs = this.attributes;
      for (var i = 0, len = mattrs.length; i < len; i++) {
        if (includes(attrs, mattrs[i].name)) {
          newState[mattrs[i].name] = mattrs[i].value
        }
      }
    }
    this.state = newState;
    render.call(this);
  }

  var detachedCallback = function () {
    this.state = null
  }

  var attributeChangedCallback = function (attr, oldVal, newVal) {
    if (includes(attrs, attr)) {
      var newState = {};
      newState[attr] = newVal
      this.state = xtend(this.state, newState);
      render.call(this);
    }
  }

  var render = function() {
    if (!this.childNodes.length) {
      this.appendChild(component(this.state));
    } else {
      component(this.state);
    }
  }

  return {
    prototype: Object.create(
      HTMLElement.prototype,
      {
        createdCallback: { value: createdCallback },
        attachedCallback: { value: attachedCallback },
        detachedCallback: { value: detachedCallback },
        attributeChangedCallback: { value: attributeChangedCallback }
      }
    )
  }
}
