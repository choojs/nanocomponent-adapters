const assert = require('assert');
const xtend = require('xtend');
const includes = require('array-includes');

module.exports = toCustomElementV1;

const toCustomElementV1 = (component, attrs = []) => {
    assert.equal(typeof component, 'function', 'nanocomponent-adapters/custom-elements-v1: component should be type function');
    assert.equal(typeof attrs, 'object', 'nanocomponent-adapters/custom-elements-v1: attrs should be type Array');
    
    class NanoEl extends HTMLElement {
        constructor() {
            // Called when the element is created or upgraded
            super();
            this.state = null;
        }
        static get observedAttributes() { return attrs; }
        connectedCallback() {
            // Called when the element is inserted into a document, including into a shadow tree
            const newState = {};
            if (this.hasAttributes()) {
                const len = attrs.length;
                const mattrs = this.attributes;
                for (let i = 0; i < len; i++) {
                    if (includes(attrs, mattrs[i].name)) {
                        newState[mattrs[i].name] = mattrs[i].value;
                    }
                }
            }
            this.state = newState;
            this.render();
        }
        disconnectedCallback() {
            this.state = null;
        }
        attributeChangedCallback(attr, oldVal, newVal) {
            this.state = xtend(this.state, {
                [attr]: newVal
            });
            this.render();
        }
        render() {
            if (!this.childNodes.length) {
                this.appendChild(component(this.state));
            }
            else {
                component(this.state);
            }
        }
    }
    return NanoEl;
};