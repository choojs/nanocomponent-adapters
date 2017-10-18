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
- [Angular](#angular)
- Ember
- Cycle
- Vue
- Inferno
- [Custom Elements (webcomponents-v0)](#custom-elements-webcomponents-v0)
- [Custom Elements (webcomponents-v1)](#custom-elements-webcomponents-v1)
- Elm

## Custom Elements (webcomponents-v0)
### Warning: v0 API is [deprecated in favor of v1](https://developers.google.com/web/fundamentals/getting-started/primers/customelements)
```js
var toCustomElement = require('nanocomponent-adapters/custom-element-v0')
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
// The second parameter corresponds to a string Array containing the names of the attributes you'd like to observe and react to changes.
var CustomButton = toCustomElement(Button, ['title'])
document.registerElement('custom-button', CustomButton)

// create new custom-button
var button = document.createElement('custom-button')
document.body.appendChild(button)
```

## Custom Elements (webcomponents-v1)
```js
var toCustomElementV1 = require('nanocomponent-adapters/custom-element-v1')
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
// The second parameter corresponds to a string Array containing the names of the attributes you'd like to observe and react to changes.
var CustomButton = toCustomElement(Button, ['title']);
customElements.define('custom-button', CustomButton);
// create new custom-button
var button = document.createElement('custom-button')
document.body.appendChild(button)
```

## Angular

```js

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import * core from '@angular/core';
import * as toAngular from 'nanocomponent-adapters/angular';
import * as Nanocomponent from 'nanocomponent';
import * as html from 'bel';

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
    return color !== this.color
  }
}

const component: any = toAngular(Button, 'custom-button', ['color'], core);

@NgModule({
  declarations: [
    AppComponent,
    component
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }

/*
You can now use the component in either a standalone or inline template
*/

`<custom-button [color]="color"></custom-button>`
```


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
    return color !== this.color
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
    return color !== this.color
  }
}

var ReactButton = toReact(Button, react)
ReactDOM.render(<ReactButton color='white' />, mountNode)
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
    return color !== this.color
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
