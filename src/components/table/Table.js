import {ExelComponent} from '@core/ExelComponent'
import {tableTemplate} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {isResize} from '@/components/table/table.functions'
import {TableSelection} from '@/components/table/TableSelection'

export class Table extends ExelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }
  toHTML() {
    return tableTemplate()
  }
  init() {
    super.init()
    this.selection = new TableSelection()
    const $ceil = this.$root.find('[data-id="0:0"]')
    this.selection.select($ceil)
    console.log('init')
  }
  onMousedown(event) {
    if (isResize(event)) {
      tableResize(event, this.$root)
    }
  }
}
