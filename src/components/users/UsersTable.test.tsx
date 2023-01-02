import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { UsersTable } from './UsersTable';

describe('<UsersTable />', () => {
  it('should show text', () => {
    const wrapper = shallow(<UsersTable />);
    const text = wrapper.find('div h1');
    expect(text.text()).toBe('Users');
  });
});
