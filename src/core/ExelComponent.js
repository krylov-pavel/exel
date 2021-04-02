import {DomListener} from '@core/DomListener'

export class ExelComponent extends DomListener {
  constructor($root, option = {}) {
    super($root, option.listeners)
  }
  toHTML() {
    return ''
  }
  init() {
    this.initDOMListeners()
  }
}
