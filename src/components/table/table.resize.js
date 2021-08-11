import {$} from '@core/dom'
export function tableResize(event, root) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizeble"]')
    const coords = $parent.getCoords()
    const ceils = root.findAll(`[data-col="${$parent.data.col}"]`)
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let value
    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px'
    })
    document.onmousemove = e => {
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = Math.floor(coords.width + delta)
        $resizer.css({right: -delta + 'px'})
      } else if (type === 'row') {
        const delta = e.pageY - coords.bottom
        value = Math.floor(coords.height + delta)
        $resizer.css({bottom: -delta + 'px'})
      }
    }
    document.onmouseup = e => {
      document.onmousemove = null
      document.onmouseup = null
      resolve({
        value,
        type,
        id: $parent.data[type]
      })
      $resizer.css({
        right: 0,
        opacity: 0,
        bottom: 0
      })
      if (type === 'col') {
        $parent.css({width: value + 'px'})
        ceils.forEach(el => el.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }
    }
  })
}
