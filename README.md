# nanocomponent-adapters [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Adapters to make [nanocomponent][nc] run natively inside frameworks. This
allows you to write highly performant components once, and reuse them between
all frameworks.

## Table of Contents
Not all languages and frameworks are supported yet; PRs to support more
frameworks support are very welcome!
- [Custom Elements (webcomponents)](#custom-elements-webcomponents)
- [Preact](#preact)
- [React](#react)
- [Choo](#choo)
- Angular
- Ember
- Cycle
- Vue
- Inferno
- [Elm](#elm)

## Custom Elements (webcomponents)
```js
var toCustomElement = require('nanocomponent-adapters/custom-element')
var component = require('nanocomponent')
var html = require('bel')

// create new nanocomponent
var Button = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

// register as custom element
Button = toCustomElement(customButton, 'button')
document.registerElement('custom-button', Button)

// create new custom-button
var button = document.createElement('button', 'custom-button')
document.body.appendChild(button)
```

## Preact
```js
var toPreact = require('nanocomponent-adapters/preact')
var component = require('nanocomponent')
var preact = require('preact')
var html = require('bel')

var render = preact.render

// create new nanocomponent
var Button = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

Button = toPreact(Button, preact)

// render an instance of Button into <body>:
render(<Button />, document.body);
```

## React
```jsx
var toReact = require('nanocomponent-adapters/react')
var component = require('nanocomponent')
var reactDom = require('react-dom')
var react = require('react')

// create new nanocomponent
var Button = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

Button = toReact(Button, react)
ReactDOM.render(<Button />, mountNode)
```

## Choo
```js
var component = require('nanocomponent')
var html = require('choo/html')
var choo = require('choo')

// create new nanocomponent
var customButton = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

var app = choo()
choo.router(['/', mainView])
document.body.appendChild(choo.start())

mainView (state, prev, send) {
  return html`
    <section>
      ${customButton(state)}
    </section>
  `
}
```

## Elm
To integrate JS components with Elm, it's common to use [custom
elements](#custom-elements-webcomponents). This requires you to create the
components in a javascript file. This works well because the state in
nanocomponents is isolated from the elm code; e.g. it doesn't talk back to Elm
code.

```js
// index.js
var toCustomElement = require('nanocomponent-adapters/custom-element')
var component = require('nanocomponent')
var html = require('bel')

// create new nanocomponent
var Button = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

// register as custom element
Button = toCustomElement(customButton, 'button')
document.registerElement('custom-button', Button)
```

```elm
-- Component.elm
main =
  node "custom-button" [] []
```
```html
<div id="main"></div>
<script src="component.js"></script>
<script src="index.js"></script>
<script>
  var node = document.getElementById('body')
  var app = Elm.Component.embed(node)
</script>
```

## See Also
- [yoshuawuyts/nanocomponent][nc]
- [shama/bel](https://github.com/shama/bel)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanocomponent-adapters.svg?style=flat-square
[3]: https://npmjs.org/package/nanocomponent-adapters
[4]: https://img.shields.io/travis/yoshuawuyts/nanocomponent-adapters/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/nanocomponent-adapters
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/nanocomponent-adapters/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/nanocomponent-adapters
[8]: http://img.shields.io/npm/dm/nanocomponent-adapters.svg?style=flat-square
[9]: https://npmjs.org/package/nanocomponent-adapters
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[nc]: https://github.com/yoshuawuyts/nanocomponent
