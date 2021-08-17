import {Page} from '@core/Page'
import {debounce, storage} from '@core/utils'
import {createStore} from '@core/store/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {Exel} from '@/components/exel/Exel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {normalizeInitialState} from '@/redux/initialState'

function storageName(param) {
  return 'excel:' + param
}

export class ExcelPage extends Page {
  getRoot() {
    // const params = this.params ? this.params : Date.now().toString()
    const params = this.params
    const state = storage(storageName(params))
    const store = createStore(rootReducer, normalizeInitialState(state))
    const stateListiner = debounce(state => {
      console.log('IndexState', state)
      storage(storageName(params), state)
    }, 500)
    store.subscribe(stateListiner)
    this.excel = new Exel({
      components: [Header, Toolbar, Formula, Table],
      store
    })
    // exel.render()
    return this.excel.getRoot()
  }
  afterRender() {
    this.excel.render()
  }
  destroy() {
    this.excel.destroy()
  }
}
