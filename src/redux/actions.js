import {CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE, APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE} from '@/redux/types'

export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data
  }
}
export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}
export function updateDate(data) {
  return {
    type: UPDATE_DATE
  }
}
export function changesStyle(data) {
  return {
    type: CHANGE_STYLES,
    data
  }
}
export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data
  }
}
export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data
  }
}
