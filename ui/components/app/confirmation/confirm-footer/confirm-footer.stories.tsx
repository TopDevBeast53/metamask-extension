import type { Meta, StoryObj } from '@storybook/react';
import ConfirmFooter from '.';

const meta: Meta<typeof ConfirmFooter> = {
  title: 'Components/App/Confirmation/ConfirmFooter',
  component: ConfirmFooter,
  parameters: {
    controls: { sort: 'alpha' },
  },
  argTypes: {
    cancelText: {
      control: 'text',
      description: 'Text for the cancel button',
      default: 'Cancel',
    },
    confirmText: {
      control: 'text',
      description: 'Text for the confirm button',
      default: 'Confirm',
    },
    cancelButtonProps: {
      control: 'object',
      description:
        'Props for the cancel button. See Button component for details',
    },
    confirmButtonProps: {
      control: 'object',
      description:
        'Props for the confirm button. See Button component for details',
    },
    onCancel: {
      action: 'onCancel',
      description: 'Function to call when the cancel button is clicked',
    },
    onConfirm: {
      action: 'onConfirm',
      description: 'Function to call when the confirm button is clicked',
    },
  },
  args: {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
  },
};
export default meta;
type Story = StoryObj<typeof ConfirmFooter>;

// 👇 Throws a type error it the args don't match the component props
export const DefaultStory: Story = {};
DefaultStory.name = 'Default';

export const CancelTextConfirmText: Story = {
  args: {
    cancelText: 'Reject',
    confirmText: 'Sign',
  },
};

export const CancelButtonButtonProps: Story = {
  args: {
    cancelButtonProps: { 'data-testid': 'cancel-button' },
    cancelText: 'Reject',
    confirmText: 'Sign',
  },
};

export const ConfirmButtonDisabledButtonProps: Story = {
  args: {
    confirmButtonProps: { disabled: true, 'data-testid': 'confirm-button' },
    cancelText: 'Reject',
    confirmText: 'Sign',
  },
};

export const ConfirmButtonDangerButtonProps: Story = {
  args: {
    confirmButtonProps: { danger: true, 'data-testid': 'confirm-button' },
    cancelText: 'Reject',
    confirmText: 'Sign',
  },
};
