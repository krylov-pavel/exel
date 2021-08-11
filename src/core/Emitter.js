export class Emitter {
  constructor() {
    this.listiners = {}
  }
  // table.emit('table:select', {a: 1})
  emit(event, ...args) {
    if (!Array.isArray(this.listiners[event])) {
      return false
    }
    this.listiners[event].forEach(listener => {
      listener(...args)
    })
    return true
  }
  // formula.subscribe('table.select', () => {})
  subscribe(event, fn) {
    this.listiners[event] = this.listiners[event] || []
    this.listiners[event].push(fn)
    return () => {
      this.listiners[event] = this.listiners[event].filter(listener => listener !== fn)
    }
  }
}
