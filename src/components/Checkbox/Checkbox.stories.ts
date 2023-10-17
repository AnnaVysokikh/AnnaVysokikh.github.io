import './Checkbox.css';
import { RouteDecorator } from '../../../.storybook/storyDecorators';

import Checkbox from './Checkbox';
import {ChangeEvent} from "react";

export default {
  component: Checkbox,
  title: 'CheckBox',
  tags: ['autodocs'],
  decorators: [RouteDecorator],
};

export const CheckBoxStory = {
  args: {
    id: '1',
    name: '2',
    label: '33',
    onChange: (event: ChangeEvent<HTMLInputElement>) => console.log("dd"),
  }
};
