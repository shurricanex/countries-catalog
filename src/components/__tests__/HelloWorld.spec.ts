import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Countries from '../../views/Countries.vue'

describe('Countries', () => {
  it('renders properly', () => {
    const wrapper = mount(Countries)
    expect(wrapper.text()).toContain('Countries')
  })
})
