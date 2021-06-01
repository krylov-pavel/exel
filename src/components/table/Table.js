import {ExelComponent} from '@core/ExelComponent'
import {tableTemplate} from '@/components/table/table.template'

export class Table extends ExelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: []
    });
  }
  toHTML() {
    return tableTemplate()
  }
}
