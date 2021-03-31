class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector
  }
  html(html) {
    if (typeof html === 'string') {
      // this.$el.innerHTML = html
      console.log(this.$el)
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear() {
    this.html('')
    return this
  }
  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    // if (Element.prototype.append) {
    //   this.$el.append(node)
    // } else {
    //   this.$el.appendChild(node)
    // }
    return this
  }
}

export function $() {
  return new Dom()
}

$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
