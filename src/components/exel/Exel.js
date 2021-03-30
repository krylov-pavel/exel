import {$} from '@core/dom'
export class Exel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }
  getRoot() {
    const $root = $.create('div', 'exel')
    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // node.insertAdjacentHTML('beforeend', component.toHTML())
      // console.log($el)
      // $el.html(component.toHTML())
      // $root.append($el)
    })
    return $root
  }
  render() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Test</h1>')
    this.$el.append(this.getRoot())
  }
}
