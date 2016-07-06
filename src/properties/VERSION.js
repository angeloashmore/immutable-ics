import { isFinite } from 'lodash'
import Property from '../Property'

export default class VERSION extends Property {
  shouldTransformValue () {
    return super.shouldTransformValue() &&
           isFinite(this.value)
  }

  transformValue () {
    return this.set('value', this.value.toFixed(1))
  }
}
