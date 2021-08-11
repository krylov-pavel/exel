import {defaultStyle} from '@/constants'
import {toInlineStyles} from '@core/utils'
import {parse} from '@core/parse'

const CODES = {
  'A': 65,
  'Z': 90
}
const WIDTH_DEFAULT = 120
const HEIGHT_DEFAULT = 24

function toCeil(state, row) {
  return function(_, col) {
    const width = getWidth(col, state.colState)
    const id = `${row}:${col}`
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyle,
      ...state.stylesState[id]
    })
    return `
   <div class="cell" 
        contenteditable="" 
        data-col="${col}" 
        data-id="${id}"
        data-type="ceil"
        data-value="${data || ''}"
        style="${styles}; width: ${width}"
        >${parse(data) || ''}</div>
  `
  }
}

function toCol({el, index, width}) {
  return `
    <div class="column" data-type="resizeble" data-col="${index}" style="width: ${width}">
    ${el}
    <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function getWidth(index, state) {
  return (state[index] || WIDTH_DEFAULT) + 'px'
}
function getHeight(index, state) {
  return (state[index] || HEIGHT_DEFAULT) + 'px'
}

function createRow(index, data, state) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  const height = getHeight(index, state)
  return `
    <div class="row" data-type="resizeble" data-row="${index}" style="height: ${height}">
      <div class="row-info">
        ${index ? index : ''}
        ${resizer}
      </div>
      <div class="row-data">${data}</div>
    </div>
  `
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return function(el, index, arr) {
    return {
      el,
      index,
      width: getWidth(index, state.colState)
    }
  }
}

export function tableTemplate(rowCount = 15, state) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toCol)
      .join('')
  rows.push(createRow(null, cols, {}))
  for (let row = 0; row <= rowCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, col) => toCeil(row, col))
        .map(toCeil(state, row))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }
  return rows.join('')
}
