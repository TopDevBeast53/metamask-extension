import { StyleUtilityProps } from '../../../component-library/box';
import { ButtonProps } from '../../../component-library/button';

export interface ConfirmFooterProps
  extends Omit<StyleUtilityProps, 'className'> {
  /**
   * Additional className to assign the ConfirmFooter component
   */
  className?: string;
  /**
   * The cancel button text
   */
  cancelText?: string;
  /**
   * The confirm button text
   */
  confirmText?: string;
  /**
   * Additional props to pass to the cancel button accepts all props of the Button component
   */
  cancelButtonProps?: ButtonProps<'button'>;
  /**
   * Additional props to pass to the confirm button accepts all props of the Button component
   */
  confirmButtonProps?: ButtonProps<'button'>;
  /**
   * The cancel button click handler
   */
  onCancel: () => void;
  /**
   * The confirm button click handler
   */
  onConfirm: () => void;
}
