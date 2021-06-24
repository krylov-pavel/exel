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
      listeners: ['mousedown', 'keydown'],
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
    this.selection.select($ceil)
    this.emitter.subscribe('update text', data => {
      this.selection.current.text(data)
      console.log(data)
    })
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
    if (keys.includes(key)) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      this.selection.select(this.$root.find(nextSelector(key, id)))
    }
  }
}
