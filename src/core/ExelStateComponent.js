import {ExelComponent} from '@core/ExelComponent'

export class ExelStateComponent extends ExelComponent {
  constructor(...args) {
    super(...args)
  }
  get template() {
    return JSON.stringify(this.state, null, 2)
  }
  initState(initState = {}) {
    console.log(this)
    this.state = {...initState}
  }
  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$root.html(this.template)
  }
}
