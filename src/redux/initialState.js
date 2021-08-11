import {storage} from '@core/utils'
import {defaultStyle, defaultTitle} from '@/constants'

const defaultState = {
  colState: {},
  rowState: {},
  currentText: '',
  dataState: {},
  stylesState: {},
  title: defaultTitle,
  currentStyles: defaultStyle
}
const normalize = (state) => {
  return {
    ...state,
    currentStyles: defaultStyle,
    currentText: ''
  }
}
export const initialState = storage('exel-state') ?
  normalize(storage('exel-state')) :
  defaultState
