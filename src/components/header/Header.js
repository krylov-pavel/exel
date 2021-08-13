import {ExelComponent} from '@core/ExelComponent'
import {headerTemplate} from '@/components/header/header.template'
import {$} from '@core/dom'
import {changeTitle} from '@/redux/actions'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Header extends ExelComponent {
  static className = 'excel__header'
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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
  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'delete') {
      const statusRemove = confirm('Вы действительно хотите удалить эту таблицу?')
      if (statusRemove) {
        ActiveRoute.navigate('')
        localStorage.removeItem('excel:' + ActiveRoute.param)
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }
}
