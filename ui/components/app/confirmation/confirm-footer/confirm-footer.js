import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ButtonSize,
  ButtonVariant,
} from '../../../component-library';
import {
  BlockSize,
  Display,
  FlexDirection,
} from '../../../../helpers/constants/design-system';

/**
 *
 * @param {string} cancelText - Text for the cancel button
 * @param {string} confirmText - Text for the confirm button
 * @param {boolean} disabled - Whether or not the confirm button should be disabled
 * @param {boolean} danger - Whether or not the confirm button should be styled as a warning
 * @param {function} onCancel - Function to call when the cancel button is clicked
 * @param {function} onConfirm - Function to call when the confirm button is clicked
 * @returns
 */
const ConfirmFooter = ({
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  disabled = false,
  danger = false,
  onCancel,
  onConfirm,
}) => {
  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      gap={4}
      padding={4}
      width={BlockSize.full}
    >
      <Button
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Lg}
        width={BlockSize.SixTwelfths}
        onClick={onCancel}
      >
        {cancelText}
      </Button>
      <Button
        size={ButtonSize.Lg}
        width={BlockSize.SixTwelfths}
        onClick={onConfirm}
        disabled={disabled}
        danger={danger}
      >
        {confirmText}
      </Button>
    </Box>
  );
};

ConfirmFooter.propTypes = {
  cancelText: PropTypes.string,
  confirmText: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmFooter;
