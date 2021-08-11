import {ExelComponent} from '@core/ExelComponent'
import {headerTemplate} from '@/components/header/header.template'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {debounce} from '@core/utils'

export class Header extends ExelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }
  prepare() {
    this.onInput = debounce(this.onInput, 500)
  }
  get template() {
    return headerTemplate(this.store.getState())
  }
  toHTML() {
    return this.template
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
