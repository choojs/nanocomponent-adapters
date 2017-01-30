var component = require('nanocomponent')
var reactDom = require('react-dom')
var react = require('react')
var html = require('bel')
var toReact = require('./react')

// create new nanocomponent
var Button = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

Button = toReact(Button, react)
var el = document.createElement('div')
document.body.appendChild(el)
reactDom.render(react.createElement(Button), el)
