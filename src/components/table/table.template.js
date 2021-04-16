const CODES = {
  'A': 65,
  'Z': 90
}

function createCeil() {
  return `
   <div class="cell" contenteditable=""></div>
  `
}

function toCol(el) {
  return `
    <div class="column">${el}</div>
  `
}

function createRow(data) {
  return `
    <div class="row">
      <div class="row-info"></div>
      <div class="row-data">${data}</div>
    </div>
  `
}

function toChar(index) {
  return String.fromCharCode(CODES.A + index)
}

export function tableTemplate(rowCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map((el, index) => {
        return String.fromCharCode(CODES.A + index)
      })
      .map((el) => {
        return toCol(el)
      })
      .join('')
  console.log(cols)
  rows.push(createRow(cols))
  for (let i = 0; i <= colsCount; i++) {
    rows.push(createRow())
  }
  return rows.join('')
}
