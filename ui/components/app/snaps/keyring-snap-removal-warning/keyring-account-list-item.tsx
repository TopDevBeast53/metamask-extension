import React from 'react';
import { InternalAccount } from '@metamask/keyring-api';
import { ButtonIcon, IconName, Text, Box } from '../../../component-library';
import {
  BlockSize,
  BorderColor,
  BorderRadius,
  Display,
  FlexDirection,
  IconColor,
  JustifyContent,
  OverflowWrap,
  TextColor,
} from '../../../../helpers/constants/design-system';
import { useI18nContext } from '../../../../hooks/useI18nContext';

export const KeyringAccountListItem = ({
  account,
  snapUrl,
}: {
  account: InternalAccount;
  snapUrl: string;
}) => {
  const t = useI18nContext();
  return (
    <Box
      display={Display.Flex}
      flexDirection={FlexDirection.Row}
      justifyContent={JustifyContent.spaceBetween}
      borderRadius={BorderRadius.MD}
      borderColor={BorderColor.borderDefault}
      padding={3}
      width={BlockSize.Full}
    >
      <Box
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        width={BlockSize.TenTwelfths}
      >
        <Box flexDirection={FlexDirection.Column} marginBottom={2}>
          <Text color={TextColor.textMuted}>{t('keyringAccountName')}</Text>
          <Text>{account.metadata.name}</Text>
        </Box>
        <Box flexDirection={FlexDirection.Column}>
          <Text color={TextColor.textMuted}>
            {t('keyringAccountPublicAddress')}
          </Text>
          <Text overflowWrap={OverflowWrap.Anywhere}>{account.address}</Text>
        </Box>
      </Box>
      <Box
        display={Display.Flex}
        flexDirection={FlexDirection.Column}
        justifyContent={JustifyContent.center}
      >
        <ButtonIcon
          ariaLabel="snap-url-export"
          iconName={IconName.Export}
          color={IconColor.primaryDefault}
          onClick={() => {
            global.platform.openTab({
              url: snapUrl,
            });
          }}
        />
      </Box>
    </Box>
  );
};