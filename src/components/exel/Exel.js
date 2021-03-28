export class Exel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.components = options.components || []
  }
  getRoot() {
    const node = document.createElement('div')
    this.components.forEach((Component) => {
      const component = new Component()
      node.insertAdjacentHTML('beforeend', component.toHTML())
    })
    return node
  }
  render() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Test</h1>')
    this.$el.append(this.getRoot())
  }
}
