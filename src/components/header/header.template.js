import {defaultTitle} from '@/constants'

export function headerTemplate(state) {
  const title = state.title || defaultTitle
  return `
      <input type="text" class="input" value="${title}" />
      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>
        <div class="button">
          <i class="material-icons">exit_to_app</i>
        </div>
      </div>
    `
}
