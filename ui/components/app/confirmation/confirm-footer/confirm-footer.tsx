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
import { useI18nContext } from '../../../../hooks/useI18nContext';

/**
 *
 * @param {object} props
 * @param {string} props.cancelText - Text for the cancel button
 * @param {string} props.confirmText - Text for the confirm button
 * @param {boolean} props.disabled - Whether or not the confirm button should be disabled
 * @param {boolean} props.danger - Whether or not the confirm button should be styled as a warning
 * @param {Function} props.onCancel - Function to call when the cancel button is clicked
 * @param {Function} props.onConfirm - Function to call when the confirm button is clicked
 * @returns
 */

export type ConfirmFooterProps = {
  cancelText?: string;
  confirmText?: string;
  disabled?: boolean;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmFooter = (props: ConfirmFooterProps) => {
  const { cancelText, confirmText, disabled, danger, onCancel, onConfirm } =
    props;
  const t = useI18nContext();
  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      gap={4}
      padding={4}
      width={BlockSize.Full}
    >
      <Button
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Lg}
        width={BlockSize.SixTwelfths}
        onClick={onCancel}
      >
        {cancelText || t('cancel')}
      </Button>
      <Button
        size={ButtonSize.Lg}
        width={BlockSize.SixTwelfths}
        onClick={onConfirm}
        disabled={disabled}
        danger={danger}
      >
        {confirmText || t('confirm')}
      </Button>
    </Box>
  );
};

export default ConfirmFooter;
