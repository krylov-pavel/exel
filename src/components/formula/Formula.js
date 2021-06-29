import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom'

export class Formula extends ExelComponent {
  static className = 'excel__formula'
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'click', 'keydown'],
      ...options
    })
  }
  toHTML() {
    return `
      <div class="info">fx</div>
      <div class="input" id="formula" contenteditable spellcheck="false"></div>
    `
  }
  init() {
    super.init()

    this.$formula = this.$root.find('#formula')
    this.$on('table:select', $ceil => {
      this.$formula.text($ceil.text())
    })
    this.$on('table:input', $ceil => {
      this.$formula.text($ceil.text())
    })
  }
  onInput(event) {
    const text = event.target.textContent.trim()
    this.$emit('update text', $(event.target).text())
  }
  onClick() {
    console.log('onClick event init')
  }
  onKeydown(event) {
    const {key} = event
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      const text = event.target.textContent.trim()
      this.$emit('formula:done', text)
    }
  }
}
