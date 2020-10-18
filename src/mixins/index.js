export const formulir = {
  props: {
    label: {
      type: String,
      required: true,
      default: ''
    },
    value: {
      type: [String, Number],
      default: null
    }
  }
}