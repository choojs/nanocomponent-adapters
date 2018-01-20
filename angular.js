var assert = require('assert')

module.exports = toAngular

function toAngular (Nanocomponent, selector, attrs, angular) {
  if (!attrs) { attrs = [] }
  assert.equal(typeof Nanocomponent, 'function', 'nanocomponent-adapters/angular: component should be type function')
  assert.equal(typeof selector, 'string', 'nanocomponent-adapters/angular: selector should be type string')
  assert.equal(typeof attrs, 'object', 'nanocomponent-adapters/angular: attrs should be type array')
  assert.equal(typeof angular, 'object', 'nanocomponent-adapters/angular: angular should be type object')

  var NewComponent = function (cd, node) {
    this.cd = cd
    this.node = node.nativeElement
    this.comp = new Nanocomponent()
    this.props = {}
  }

  var DecorateWith = angular.Component({
    selector: selector,
    template: '',
    changeDetection: angular.ChangeDetectionStrategy.OnPush,
    inputs: attrs
  });

  var NewComponent = DecorateWith(NewComponent)

  NewComponent.parameters = [angular.ChangeDetectorRef, angular.ElementRef];
  
  NewComponent.prototype = {}

  NewComponent.prototype.constructor = NewComponent

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
