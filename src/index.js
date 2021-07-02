import 'core-js/stable' // Вместо @babel/polyfill
import 'regenerator-runtime/runtime' // Вместо @babel/polyfill
import './scss/index.scss'
import {Exel} from '@/components/exel/Exel'
import {Header} from '@/components/header/Header'
import {Table} from './components/table/Table'
import {Formula} from './components/formula/Formula'
import {Toolbar} from './components/toolbar/Toolbar'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'

const store = createStore(rootReducer)

const exel = new Exel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

exel.render()
