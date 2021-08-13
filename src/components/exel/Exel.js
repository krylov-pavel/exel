import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscribe} from '@core/StoreSubscribe'
import {updateDate} from '@/redux/actions'
export class Exel {
  constructor(options) {
    this.components = options.components || []
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscribe(this.store)
  }
  getRoot() {
    const $root = $.create('div', 'exel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    this.components = this.components.map((Component) => {
      const $el = $.create('div', Component.className)
      const component = new Component($el, componentOptions)
      // node.insertAdjacentHTML('beforeend', component.toHTML())
      $el.html(component.toHTML())
      $root.append($el)
      return component
    })
    return $root
  }
  render() {
    // this.$el.insertAdjacentHTML('afterbegin', '<h1>Test</h1>')
    this.store.dispatch(updateDate())
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
    // this.components.forEach(component => component.destroy())
    // setTimeout(() => {
    //   this.components.forEach(component => component.removeListener())
    // }, 10000)
  }
  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach(component => component.destroy())
  }
}
