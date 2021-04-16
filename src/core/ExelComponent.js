import {DomListener} from '@core/DomListener'

export class ExelComponent extends DomListener {
  constructor($root, option = {}) {
    super($root, option.listeners)
    this.name = option.name || ''
  }
  toHTML() {
    return ''
  }
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
  }
}
