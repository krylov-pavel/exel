import {$} from '@core/dom'
export class Exel {
  constructor(selector, options) {
    this.$el = $(selector)
    this.components = options.components || []
  }
  getRoot() {
    const $root = $.create('div', 'exel')
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el)
      // node.insertAdjacentHTML('beforeend', component.toHTML())
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }
  render() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Test</h1>')
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
    // this.components.forEach(component => component.destroy())
    // setTimeout(() => {
    //   this.components.forEach(component => component.removeListener())
    // }, 10000)
  }
}
