import type { Meta, StoryObj } from '@storybook/react';
import Component from '../../components/QuestionComponents/QuestionTextarea/component';

const meta = {
  title: 'Question/QuestionTextarea',
  component: Component
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const SetProps: Story = {
  args: {
    title: 'Custom title',
    placeholder: 'Type here...'
  }
};
