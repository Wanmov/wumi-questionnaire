import type { Meta, StoryObj } from '@storybook/react';
import Component from '../../components/QuestionComponents/QuestionParagraph/component';

const meta = {
  title: 'Question/QuestionParagraph',
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
    isCenter: true
  }
};

export const BreakLine: Story = {
  args: {
    text: 'hello\nhello\nhello'
  }
};
