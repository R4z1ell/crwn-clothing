import React from 'react';
import { shallow } from 'enzyme';
import Homepage from './homepage.component';

it('should render Homepage component', () => {
  const homepageComponent = shallow(<Homepage />);
  expect(homepageComponent.debug()).toMatchSnapshot();
});
