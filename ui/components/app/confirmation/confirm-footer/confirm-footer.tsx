import React from 'react';
import classnames from 'classnames';
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
import { BoxProps } from '../../../component-library/box';
import { ConfirmFooterProps } from './confirm-footer.types';

const ConfirmFooter: React.FC<ConfirmFooterProps> = ({
  className = '',
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  confirmButtonProps,
  cancelButtonProps,
  ...props
}) => {
  const t = useI18nContext();
  return (
    <Box
      className={classnames('confirm-footer', className)}
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      gap={4}
      padding={4}
      width={BlockSize.Full}
      {...(props as BoxProps<'div'>)}
    >
      <Button
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Lg}
        block
        onClick={onCancel}
        {...cancelButtonProps}
      >
        {cancelText || t('cancel')}
      </Button>
      <Button
        size={ButtonSize.Lg}
        block
        onClick={onConfirm}
        {...confirmButtonProps}
      >
        {confirmText || t('confirm')}
      </Button>
    </Box>
  );
};

export default ConfirmFooter;
