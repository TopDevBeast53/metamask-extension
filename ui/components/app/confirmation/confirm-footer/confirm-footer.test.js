import React from 'react';
import { fireEvent, getAllByRole, render } from '@testing-library/react';
import ConfirmFooter from '.';

describe('ConfirmFooter', () => {
  const props = {
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct text', () => {
    const { getAllByRole, getByText } = render(<ConfirmFooter {...props} />);
    expect(getAllByRole('button')[0]).toBeInTheDocument();
    expect(getAllByRole('button')[1]).toBeInTheDocument();
    expect(getByText('[confirm]')).toBeInTheDocument();
    expect(getByText('[cancel]')).toBeInTheDocument();
  });

  it('calls the correct function when Confirm is clicked', () => {
    const { getAllByRole } = render(<ConfirmFooter {...props} />);
    fireEvent.click(getAllByRole('button')[1]);
    expect(props.onConfirm).toHaveBeenCalled();
    expect(props.onCancel).not.toHaveBeenCalled();
  });

  it('calls the correct function when Cancel is clicked', () => {
    const { getAllByRole } = render(<ConfirmFooter {...props} />);
    fireEvent.click(getAllByRole('button')[0]);
    expect(props.onCancel).toHaveBeenCalled();
    expect(props.onConfirm).not.toHaveBeenCalled();
  });

  it('disables the confirm button when disabled is true', () => {
    const { getAllByRole } = render(<ConfirmFooter {...props} disabled />);
    expect(getAllByRole('button')[1]).toBeDisabled();
    expect(getAllByRole('button')[0]).toBeEnabled();
  });

  it('styles the confirm button as danger when danger is true', () => {
    const { getAllByRole } = render(<ConfirmFooter {...props} danger />);
    expect(getAllByRole('button')[1]).toHaveClass(' mm-box--background-color-error-default');
    expect(getAllByRole('button')[0]).not.toHaveClass(' mm-box--background-color-error-default');
  });

  it('renders correct text and fires events when text is specified in props', () => {
    const overrideTextProps = {
      ...props,
      cancelText: 'Close',
      confirmText: 'Submit',
    };

    const { getByText } = render(<ConfirmFooter {...overrideTextProps} />);
    expect(getByText('Submit')).toBeInTheDocument();
    expect(getByText('Close')).toBeInTheDocument();

    getByText('Close').click();
    expect(props.onCancel).toHaveBeenCalled();

    fireEvent.click(getByText('Submit'));
    expect(props.onConfirm).toHaveBeenCalled();
  });
});
