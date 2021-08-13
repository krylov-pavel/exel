import {defaultTitle} from '@/constants'

export function headerTemplate(state) {
  const title = state.title || defaultTitle
  return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button" data-button="delete">
          <i class="material-icons" data-button="delete">delete</i>
        </div>
        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
      </div>
    `
}
