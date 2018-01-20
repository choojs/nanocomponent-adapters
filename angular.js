var assert = require('assert')

module.exports = toAngular

function toAngular (Nanocomponent, selector, attrs, angular) {
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
    new angular.Component({
      selector: selector,
      template: '<div #target></div>',
      changeDetection: angular.ChangeDetectionStrategy.OnPush
    })
  ]
  NewComponent.parameters = [[angular.ChangeDetectorRef]]
  var propMetadata = {
    'target': [new angular.ViewChild('target', { 'read': angular.ElementRef })]
  }

  attrs.forEach(function (key) {
    propMetadata[key] = [new angular.Input(key)]
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
