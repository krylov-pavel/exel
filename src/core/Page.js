export class Page {
  constructor(params) {
    this.params = params
  }
  getRoot() {
    throw new Error('Not method "getRoot"')
  }
  afterRender() {}
  destroy() {}
}
