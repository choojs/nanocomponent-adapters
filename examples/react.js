var Button = require('./button')
var reactDom = require('react-dom')
var react = require('react')
var toReact = require('../react')

var ReactButton = toReact(Button, react)
var el = document.createElement('div')
document.body.appendChild(el)
reactDom.render(react.createElement(ReactButton, { color: 'green' }), el)
