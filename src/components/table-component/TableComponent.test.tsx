import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { TableComponent } from './TableComponent';
import api from '../../lib/api';

describe('<TableComponent />', () => {
  it('should show text', () => {
    const wrapper = shallow(
      <TableComponent title='Users' getDiff={api.getUsersDiff} />
    );
    const text = wrapper.find('div h1');
    expect(text.text()).toContain('Users');
  });
});
