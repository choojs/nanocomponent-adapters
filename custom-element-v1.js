const assert = require('assert')

module.exports = toCustomElementV1

function toCustomElementV1 (Nanocomponent, attrs = []) {
  assert.equal(typeof Nanocomponent, 'function', 'nanocomponent-adapters/custom-elements-v1: Nanocomponent should be type function')
  assert.equal(typeof attrs, 'object', 'nanocomponent-adapters/custom-elements-v1: attrs should be type Array')

  class NanoEl extends window.HTMLElement {
    constructor () {
      super()
      this.props = {}
      this.comp = new Nanocomponent()
    }
    static get observedAttributes () { return attrs }
    connectedCallback () {
      const newProps = {}
      if (this.hasAttributes()) {
        const len = attrs.length
        const mattrs = this.attributes
        for (let i = 0; i < len; i++) {
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
    disconnectedCallback () {
      this.props = null
      this.comp = null
    }
    attributeChangedCallback (attr, oldVal, newVal) {
      this.props[attr] = newVal
      if (this.comp.element) this.comp.render(this.props)
    }
    }
  return NanoEl
}
