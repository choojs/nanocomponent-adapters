# nanocomponent-adapters [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Adapters to make nanocomponent instances work inside specific frameworks.

## Table of Contents
- [custom elements (webcomponents)](#custom-elements)
- [choo](#choo)

## Custom Elements
```js
var toCustomElement = require('nanocomponent-adapters/custom-element')
var component = require('nanocomponent')
var html = require('bel')

// create new nanocomponent
var customButton = component({
  render: function (data) {
    return html`
      <button>hello planet</button>
    `
  }
})

// register as custom element
document.registerElement('custom-button', {
  prototype: toCustomElement(customButton),
  extends: 'button'
})

// create new custom-button
var button = document.createElement('button', 'custom-button')
document.body.appendChild(button)
```

## Choo
```js
var component = require('nanocomponent')
var choo = require('choo')
var html = require('bel')

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

## See Also
- [yoshuawuyts/nanocomponent](https://github.com/yoshuawuyts/nanocomponent)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanocomponent-to-webcomponent.svg?style=flat-square
[3]: https://npmjs.org/package/nanocomponent-to-webcomponent
[4]: https://img.shields.io/travis/yoshuawuyts/nanocomponent-to-webcomponent/master.svg?style=flat-square
[5]: https://travis-ci.org/yoshuawuyts/nanocomponent-to-webcomponent
[6]: https://img.shields.io/codecov/c/github/yoshuawuyts/nanocomponent-to-webcomponent/master.svg?style=flat-square
[7]: https://codecov.io/github/yoshuawuyts/nanocomponent-to-webcomponent
[8]: http://img.shields.io/npm/dm/nanocomponent-to-webcomponent.svg?style=flat-square
[9]: https://npmjs.org/package/nanocomponent-to-webcomponent
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
