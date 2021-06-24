import {ExelComponent} from '@core/ExelComponent'

export class Formula extends ExelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click'],
      ...options
    })
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" contenteditable spellcheck="false"></div>
    `
  }
  onInput(event) {
    const text = event.target.textContent.trim()
    this.emitter.emit('update text', text)
  }
  onClick() {
    console.log('onClick event init')
  }
}
