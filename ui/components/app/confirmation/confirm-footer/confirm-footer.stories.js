import React from 'react';
import ConfirmFooter from '.';

export default {
  title: 'Components/App/Confirmation/ConfirmFooter',
  description: 'Generic footer component for confirmation pages',
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
    disabled: {
      control: 'boolean',
      description: 'Whether or not the confirm button should be disabled',
      default: false,
    },
    danger: {
      control: 'boolean',
      description: 'Whether or not the confirm button should be styled as a warning',
      default: false,
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

export const DefaultStory = (args) => <ConfirmFooter {...args} />;

DefaultStory.storyName = 'Default';
