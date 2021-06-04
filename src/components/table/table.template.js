const CODES = {
  'A': 65,
  'Z': 90
}

function toCeil(el, index) {
  return `
   <div class="cell" contenteditable="" data-col="${index}"></div>
  `
}

function toCol(el, index) {
  return `
    <div class="column" data-type="resizeble" data-col="${index}">
    ${el}
    <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, data) {
  const resizer = index ? '<div class="row-resize" data-resize="row"></div>' : ''
  return `
    <div class="row" data-type="resizeble">
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

export function tableTemplate(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toCol)
      .join('')
  rows.push(createRow(null, cols))
  for (let i = 0; i <= rowCount; i++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCeil)
        .join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}
