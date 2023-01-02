import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ProjectsTable } from './ProjectsTable';

describe('<ProjectsTable />', () => {
  it('should show text', () => {
    const wrapper = shallow(<ProjectsTable />);
    const text = wrapper.find('div h1');
    expect(text.text()).toBe('Projects');
  });
});
