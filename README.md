# nanocomponent-adapters [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5]
[![downloads][8]][9] [![js-standard-style][10]][11]

Adapters to make [nanocomponent][nc] run natively inside frameworks. This
allows you to write highly performant components once, and reuse them between
all frameworks.

## Table of Contents
Not all languages and frameworks are supported yet; PRs to support more
frameworks support are very welcome!
- [Preact](#preact)
- [React](#react)
- [Choo](#choo)
- Angular
- Ember
- Cycle
- Vue
- Inferno
- Custom Elements (webcomponents)
- Elm

## Preact
```js
var toPreact = require('nanocomponent-adapters/preact')
var Nanocomponent = require('nanocomponent')
var preact = require('preact')
var html = require('bel')

var render = preact.render

class Button extends Nanocomponent {
  constructor () {
    super()
    this.color = null
  }

  handleClick () {
    console.log('choo choo!')
  }

  createElement ({color}) {
    this.color = color
    return html`
      <button onclick=${this.handleClick} style="background-color: ${color}">
        Click Me
      </button>
    `
  }

  update ({color}) {
    return newColor !== this.color
  }
}

var PreactButton = toPreact(Button, preact)

// render an instance of Button into <body>:
render(<PreactButton color='red'/>, document.body);
```

## React
```js
var toReact = require('nanocomponent-adapters/react')
var Nanocomponent = require('nanocomponent')
var reactDom = require('react-dom')
var react = require('react')

class Button extends Nanocomponent {
  constructor () {
    super()
    this.color = null
  }

  handleClick () {
    console.log('choo choo!')
  }

  createElement ({color}) {
    this.color = color
    return html`
      <button onclick=${this.handleClick} style="background-color: ${color}">
        Click Me
      </button>
    `
  }

  update ({color}) {
    return newColor !== this.color
  }
}

var ReactButton = toReact(Button, react)
ReactDOM.render(<Button color='white' />, mountNode)
```

## Choo

Choo just works™.

```js
var Nanocomponent = require('nanocomponent')
var html = require('choo/html')
var choo = require('choo')

// create new nanocomponent
class Button extends Nanocomponent {
  constructor () {
    super()
    this.color = null
  }

  handleClick (color) {
    console.log('choo choo!')
  }

  createElement (color) {
    this.color = color
    return html`
      <button onclick=${this.handleClick} style="background-color: ${color}">
        Click Me
      </button>
    `
  }

  update (color) {
    return newColor !== this.color
  }
}

var app = choo()
app.route('/', mainView)
app.mount('body')

var customButton = new Button ()

function mainView (state, emit) {
  return html`
    <section>
      ${customButton.render('blue')}
    </section>
  `
}
```

## See Also
- [choojs/nanocomponent][nc]
- [shama/bel](https://github.com/shama/bel)

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanocomponent-adapters.svg?style=flat-square
[3]: https://npmjs.org/package/nanocomponent-adapters
[4]: https://img.shields.io/travis/choojs/nanocomponent-adapters/master.svg?style=flat-square
[5]: https://travis-ci.org/choojs/nanocomponent-adapters
[8]: http://img.shields.io/npm/dm/nanocomponent-adapters.svg?style=flat-square
[9]: https://npmjs.org/package/nanocomponent-adapters
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
[nc]: https://github.com/choojs/nanocomponent
