import React from 'react';
import Header from '../index.js';
import { mount } from 'enzyme';

describe("header", ()=>{
  it("renders", () => {
    expect(Header).not.toBeUndefined();
  });

  it('renders list elements tag', () => {
    const wrapper = mount(<p>Hello</p>);
    expect(wrapper.html()).toMatch('Hello');
  });
});
