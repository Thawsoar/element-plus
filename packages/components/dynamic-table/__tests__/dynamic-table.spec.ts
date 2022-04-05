import { mount } from '@vue/test-utils'
import DynamicTable from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('DynamicTable.vue', () => {
  test('render test', () => {
    const wrapper = mount(DynamicTable, {
      slots: {
        default: AXIOM,
      },
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })
})
