import {ExelComponent} from '@core/ExelComponent'
import {$} from '@core/dom'
import {tableTemplate} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {isResize, isCeil, range, matrix, nextSelector} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'

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
    return tableTemplate()
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    const $ceil = this.$root.find('[data-id="0:0"]')
    this.selectCeil($ceil)
    this.$on('update text', data => {
      this.selection.current.text(data)
    })
    this.$on('formula:done', data => {
      this.selection.current.focus()
    })
  }
  selectCeil(ceil) {
    this.selection.select(ceil)
    this.$emit('table:select', ceil)
  }
  onMousedown(event) {
    if (isResize(event)) {
      tableResize(event, this.$root)
    } else if (isCeil(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $ceils = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($ceils)
      } else {
        this.selection.select($target)
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
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
