// import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom'
import {toolbarTemplate} from '@/components/toolbar/toolbar.template'
import {ExelStateComponent} from '@core/ExelStateComponent'
import {defaultStyle} from '@/constants'

export class Toolbar extends ExelStateComponent {
  static className = 'excel__toolbar'
  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      subscribe: ['currentStyles'],
      listeners: ['click'],
      ...options
    })
  }
  prepare() {
    this.initState(defaultStyle)
  }
  get template() {
    return toolbarTemplate(this.state)
  }
  toHTML() {
    return this.template
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      const key = Object.keys(value)[0]
      this.$emit('toolbar:applyStyle', value)
      // this.setState({[key]})
      this.setState({[key]: value[key]})
      // console.log({[key]: value[key]})
    }
  }
}
