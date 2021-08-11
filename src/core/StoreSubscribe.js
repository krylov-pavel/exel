import {isEqual} from '@core/utils';

export class StoreSubscribe {
  constructor(store) {
    this.store = store
    this.prevState = null
    this.sub = null
  }
  subscribeComponents(components) {
    this.prevState = this.store.getState()
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(this.prevState[key], state[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changed = {[key]: state[key]}
              component.storeChanged(changed)
            }
          })
        }
      })
      this.prevState = this.store.getState()
    })
  }
  unsubscribeFromStore(components) {
    this.sub.unsubscribe()
  }
}
