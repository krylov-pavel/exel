import {ExelComponent} from '@core/ExelComponent'
import {tableTemplate} from '@/components/table/table.template'
import {tableResize} from '@/components/table/table.resize'
import {isResize} from '@/components/table/table.functions'

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
  onMousedown(event) {
    if (isResize(event)) {
      tableResize(event, this.$root)
    }
  }
}
