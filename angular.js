var assert = require('assert')
var {Component, ChangeDetectorRef, ViewChild, ElementRef, ChangeDetectionStrategy, Input} = require('@angular/core')

module.exports = toAngular

function toAngular (Nanocomponent, selector, attrs) {
  if (!attrs) { attrs = [] }
  assert.equal(typeof Nanocomponent, 'function', 'nanocomponent-adapters/angular: component should be type object')
  assert.equal(typeof selector, 'string', 'nanocomponent-adapters/angular: selector should be type string')
  assert.equal(typeof attrs, 'object', 'nanocomponent-adapters/angular: attrs should be type Array')

  var NewComponent = function (cd) {
    this.cd = cd
    this.node = null
    this.comp = new Nanocomponent()
    this.props = {}
  }
  NewComponent.prototype = {}

  NewComponent.annotations = [
    new Component({
      selector: selector,
      template: '<div #target></div>',
      changeDetection: ChangeDetectionStrategy.OnPush
    })
  ]
  NewComponent.parameters = [[ChangeDetectorRef]]
  var propMetadata = {
    'target': [new ViewChild('target', { 'read': ElementRef })]
  }

  attrs.forEach(function (key) {
    propMetadata[key] = [new Input(key)]
  })

  NewComponent.propMetadata = propMetadata

  NewComponent.prototype.constructor = NewComponent

  Object.defineProperty(NewComponent.prototype, 'target', {
    set: function (el) {
      this.node = el.nativeElement
    },
    get: function () { return this.node }
  })

  NewComponent.prototype.ngOnChanges = function (changes) {
    var _this = this
    Object.keys(changes).forEach(function (change) {
      _this.props[change] = changes[change].currentValue
    })
    if (this.comp.element) this.comp.render(this.props)
  }

  NewComponent.prototype.ngOnInit = function () {
    if (!this.comp.element) {
      var el = this.comp.render(this.props)
      this.node.appendChild(el)
    }
  }

  return NewComponent
};
