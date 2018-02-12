var assert = require('assert')

module.exports = toCustomElement

function toCustomElement (Nanocomponent, attrs) {
  if (!attrs) { attrs = [] }
  assert.equal(typeof Nanocomponent, 'function', 'nanocomponent-adapters/custom-elements: component should be type object')
  assert.equal(typeof attrs, 'object', 'nanocomponent-adapters/custom-elements-v1: attrs should be type Array')

  var createdCallback = function () {
    this.props = {}
    this.comp = new Nanocomponent()
  }

  var attachedCallback = function () {
    var newProps = {}
    if (this.hasAttributes()) {
      var mattrs = this.attributes
      for (var i = 0, len = mattrs.length; i < len; i++) {
        if (attrs.includes(mattrs[i].name)) {
          newProps[mattrs[i].name] = mattrs[i].value
        }
      }
    }
    this.props = newProps
    if (!this.comp.element) {
      var el = this.comp.render(this.props)
      this.appendChild(el)
    }
  }

  var detachedCallback = function () {
    this.props = null
    this.comp = null
  }

  var attributeChangedCallback = function (attr, oldVal, newVal) {
    if (attrs.includes(attr)) {
      this.props[attr] = newVal
      if (this.comp.element) this.comp.render(this.props)
    }
  }

  return {
    prototype: Object.create(
      window.HTMLElement.prototype,
      {
        createdCallback: { value: createdCallback },
        attachedCallback: { value: attachedCallback },
        detachedCallback: { value: detachedCallback },
        attributeChangedCallback: { value: attributeChangedCallback }
      }
    )
  }
}
