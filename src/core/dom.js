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
  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
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
  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }
  focus() {
    this.$el.focus()
    return this
  }
  id(parse) {
    if (parse) {
      const $parsed = this.id().split(':')
      const [row, col] = $parsed
      return {
        row: +row,
        col: +col
      }
    }
    return this.data.id
  }
  getCoords() {
    return this.$el.getBoundingClientRect()
  }
  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value)
      return this
    }
    return this.$el.getAttribute(name)
  }
  css(style={}) {
    Object
        .keys(style)
        .forEach(key => {
          this.$el.style[key] = style[key]
        })
    return this
  }
  getStyle(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s]
      return res
    }, {})
  }
  addClass(className) {
    this.$el.classList.add(className)
    return this
  }
  removeClass(className) {
    this.$el.classList.remove(className)
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
