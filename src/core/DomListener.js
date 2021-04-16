import {capitalize} from '@core/capitalize'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root elements')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      const name = this.name || ''
      if (!this[method]) {
        throw new Error(`Method ${method} empty component ${name}`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}
