import {
  Input,
  Select,
  Option,
  checkboxGroup,
  checkbox
} from 'element-ui'
export const formItemContent = {
  input: {
    tag: Input.name,
    comp: Input,
    placeholder: '请输入'
  },
  select: {
    tag: Select.name,
    comp: Select,
    placeholder: '请选择',
    child: {
      tag: Option.name,
      comp: Option
    }
  },
  check: {
    tag: checkboxGroup.name,
    comp: checkboxGroup,
    child: {
      tag: checkbox,
      comp: checkbox
    }
  }
}
