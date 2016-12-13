import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import ColorOption from './';
import Icon from 'carbon/lib/components/icon';
import { shallow  } from 'enzyme';

describe('ColorOption', () => {
  let instance;

  describe('unchecked option', () => {
    beforeEach(() => {
      instance = shallow(<ColorOption
        color="#ab03ff"
        name="settings[theme_color]"
        checked={ false }
      />);
    });

    it("contains a radio button ", () => {
      let input = instance.find('input');
      expect(input.length).toEqual(1);
      input = input.first();

      expect(input.prop('type')).toEqual('radio');
      expect(input.prop('name')).toEqual('settings[theme_color]');
      expect(input.prop('value')).toEqual('#ab03ff');
      expect(input.prop('checked')).toBeFalsy();
      expect(input.hasClass('carbon-color-option__radio-button-input')).toBeTruthy();
    });

    it("contains a tick Icon", () => {
      let icon = instance.find(Icon).first();
      expect(icon.prop('type')).toEqual('tick');
      expect(icon.hasClass('carbon-color-option__tick')).toBeTruthy();
    });

    it("contains a color-sample div", () => {
      let colorSample = instance.find('.carbon-color-option__color-sample');

      expect(colorSample.hasClass('carbon-color-option__color-sample--ab03ff')).toBeTruthy();
      expect(colorSample.prop('style').backgroundColor).toEqual("#ab03ff");
    });
  });

  describe('checked option', () => {
    beforeEach(() => {
      instance = shallow(<ColorOption
        color="transparent"
        checked={ true }
      />);
    });

    it("contains a radio button ", () => {
      let input = instance.find('input').first();
      expect(input.prop('value')).toEqual('transparent');
      expect(input.prop('checked')).toBeTruthy();
    });
  });

});

