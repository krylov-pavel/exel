import 'core-js/stable' // Вместо @babel/polyfill
import 'regenerator-runtime/runtime' // Вместо @babel/polyfill
import './scss/index.scss'
import {Router} from '@core/routes/router'
import {DashboardPage} from '@/pages/DashboardPage'
import {ExcelPage} from '@/pages/ExcelPage'

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
})

