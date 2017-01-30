var assert = require('assert')

module.exports = toPreact

function toPreact (component, preact) {
  assert.equal(typeof component, 'function', 'nanocomponent-adapters/preact: component should be type function')
  assert.equal(typeof preact, 'object', 'nanocomponent-adapters/preact: preact should be type object')

  var element = null
  var props = null
  var node = null

  class clx extends preact.Component {
    shouldComponentUpdate (nextProps) {
      return false
    }

    componentDidMount () {
      if (!element) {
        element = component(props)
        node.appendChild(element)
      }
    }

    componentWillReceiveProps (nwProps) {
      props = nwProps
      if (element) element(props)
    }

    setRef (_node) {
      node = _node
    }

    render (_props) {
      props = _props
      return preact.h('div', { ref: this.setRef })
    }
  }

  return clx
}
