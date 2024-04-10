import type { Meta, StoryObj } from '@storybook/react';
import Component from '../../components/QuestionComponents/QuestionInfo/component';

const meta = {
  title: 'Question/QuestionInfo',
  component: Component
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const SetProps: Story = {
  args: {
    title: 'hello',
    desc: 'world'
  }
};

export const DescBreakLine: Story = {
  args: {
    title: 'hello',
    desc: 'world\nworld\nworld' // 换行
  }
};
