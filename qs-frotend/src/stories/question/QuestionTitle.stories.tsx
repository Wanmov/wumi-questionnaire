import type { Meta, StoryObj } from '@storybook/react';
import Component from '../../components/QuestionComponents/QuestionTitle/component';

const meta = {
  title: 'Question/QuestionTitle',
  component: Component
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const SetProps: Story = {
  args: {
    text: 'hello',
    level: 2,
    textAlign: 'center'
  }
};
