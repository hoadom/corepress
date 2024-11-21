import InputField from './input'
import CheckBoxField from './check-box'
export { default as NotSupportField } from './not-support'

export const FIELDS_TYPE = {
  text: 'text',
  checkBox :'check-box'
}

export const FIELDS = {
  [FIELDS_TYPE.text]: InputField,
  [FIELDS_TYPE.checkBox]: CheckBoxField
}
