import React from 'react';
import PropTypes from 'prop-types';
import { BannerAlert, IconName, Text } from '../../../component-library';
import { TextColor } from '../../../../helpers/constants/design-system';

const SnapUpdateAlert = ({ snapName, onUpdateClick, bannerAlertProps }) => {
  return (
    <BannerAlert
      title="Update available"
      actionButtonLabel="Update"
      actionButtonOnClick={onUpdateClick}
      actionButtonProps={{
        endIconName: IconName.Download,
        color: TextColor.primaryDefault,
      }}
      {...bannerAlertProps}
    >
      <Text>Get the latest version of {snapName}</Text>
    </BannerAlert>
  );
};

SnapUpdateAlert.propTypes = {
  /**
   * snapName Name of a Snap.
   */
  snapName: PropTypes.string.isRequired,
  /**
   * onUpdateClick Update handler callback.
   */
  onUpdateClick: PropTypes.func.isRequired,
  /**
   * bannerAlertProps additional properties for BannerAlert.
   */
  bannerAlertProps: PropTypes.object,
};

export default SnapUpdateAlert;
