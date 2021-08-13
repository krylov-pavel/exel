import {defaultStyle, defaultTitle} from '@/constants'
import {clone} from '@core/utils'

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  title: defaultTitle,
  currentStyles: defaultStyle,
  openedDate: new Date().toJSON()
}
const normalize = (state) => {
  return {
    ...state,
    currentStyles: defaultStyle,
    currentText: ''
  }
}

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}
