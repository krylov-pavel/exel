import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom'
import {tableTemplate} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {isResize, isCeil, range, matrix, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'
import * as actions from '@/redux/actions'
import {defaultStyle} from '@/constants'
import {parse} from '@core/parse'

export class Table extends ExelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }
  toHTML() {
    return tableTemplate(20, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $ceil = this.$root.find('[data-id="0:0"]')
    this.selectCeil($ceil)
    this.$on('update text', data => {
      this.selection.current
          .attr('data-value', data)
          .text(parse(data))
      // this.selection.current.text(data)
      this.updateTextInStore(data)
    })
    this.$on('formula:done', data => {
      this.selection.current.focus()
    })
    this.$on('toolbar:applyStyle', value => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
    // this.$subscribe(state => {
    //   console.log('TableState ', state)
    // })
  }
  selectCeil(ceil) {
    this.selection.select(ceil)
    this.$emit('table:select', ceil)
    const styles = ceil.getStyle(Object.keys(defaultStyle))
    console.log(styles)
    this.$dispatch(actions.changesStyle(styles))
  }
  async resizeHandler(event) {
    tableResize(event, this.$root)
    try {
      const data = await tableResize(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.log(e.message)
    }
  }
  onMousedown(event) {
    if (isResize(event)) {
      this.resizeHandler(event)
    } else if (isCeil(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $ceils = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($ceils)
      } else {
        this.selectCeil($target)
      }
    }
  }
  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
    const {key} = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCeil($next)
    }
  }
  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value: value
    }))
  }
  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }
}
