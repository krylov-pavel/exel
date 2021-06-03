class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }
  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }

    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }

    return this
  }
  closest(selector) {
    return $(this.$el.closest(selector))
  }
  get data() {
    return this.$el.dataset
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  css(style={}) {
    Object
        .keys(style)
        .forEach(key => {
          this.$el.style[key] = style[key]
        })
    return this
  }
}
export function $(selector) {
  return new Dom(selector)
}
$.create = (tagname, clasess = '') => {
  const el = document.createElement(tagname)
  if (clasess) {
    el.classList.add(clasess)
  }
  return $(el)
}
