import {DomListener} from '@core/DomListener'

export class ExelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.unsubscribers = []
  }
  // настраиваем компонент до init
  prepare() {}
  // уведомляем слушателя про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  // возвращаем шаблон компонента
  toHTML() {
    return ''
  }
  // инициализируем компонент
  // добавляем DOM слушателей
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
