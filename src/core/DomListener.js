export class DomListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root elements')
    }
    this.$root = $root
  }
}
