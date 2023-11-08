import { TrezorBridge } from '@metamask/eth-trezor-keyring';
import type {
  EthereumSignMessage,
  EthereumSignTransaction,
  Params,
  EthereumSignTypedDataTypes,
  ConnectSettings,
  Manifest,
  Response as TrezorResponse,
  EthereumSignedTx,
  PROTO,
  EthereumSignTypedHash,
} from '@trezor/connect-web';
import {
  OffscreenCommunicationEvents,
  OffscreenCommunicationTarget,
  TrezorAction,
} from '../../../../shared/constants/offscreen-communication';

export class TrezorOffscreenBridge implements TrezorBridge {
  model: string | undefined;

  init(
    settings: {
      manifest: Manifest;
    } & Partial<ConnectSettings>,
  ) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (
        msg.target === OffscreenCommunicationTarget.extension &&
        msg.event === OffscreenCommunicationEvents.trezorDeviceConnect
      ) {
        this.model = msg.payload;
      }
    });

    return new Promise<void>((resolve) => {
      chrome.runtime.sendMessage(
        {
          target: OffscreenCommunicationTarget.trezorOffscreen,
          action: TrezorAction.init,
          params: settings,
        },
        () => {
          resolve();
        },
      );
    });
  }

  dispose() {
    return new Promise<void>((resolve) => {
      chrome.runtime.sendMessage(
        {
          target: OffscreenCommunicationTarget.trezorOffscreen,
          action: TrezorAction.dispose,
        },
        () => {
          resolve();
        },
      );
    });
  }

  getPublicKey(params: { path: string; coin: string }) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          target: OffscreenCommunicationTarget.trezorOffscreen,
          action: TrezorAction.getPublicKey,
          params,
        },
        (response) => {
          resolve(response);
        },
      );
    }) as TrezorResponse<{ publicKey: string; chainCode: string }>;
  }

  ethereumSignTransaction(params: Params<EthereumSignTransaction>) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          target: OffscreenCommunicationTarget.trezorOffscreen,
          action: TrezorAction.signTransaction,
          params,
        },
        (response) => {
          resolve(response);
        },
      );
    }) as TrezorResponse<EthereumSignedTx>;
  }

  ethereumSignMessage(params: Params<EthereumSignMessage>) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          target: OffscreenCommunicationTarget.trezorOffscreen,
          action: TrezorAction.signMessage,
          params,
        },
        (response) => {
          resolve(response);
        },
      );
    }) as TrezorResponse<PROTO.MessageSignature>;
  }

  ethereumSignTypedData<T extends EthereumSignTypedDataTypes>(
    params: Params<EthereumSignTypedHash<T>>,
  ) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        {
          target: OffscreenCommunicationTarget.trezorOffscreen,
          action: TrezorAction.signTypedData,
          params,
        },
        (response) => {
          resolve(response);
        },
      );
    }) as TrezorResponse<PROTO.EthereumTypedDataSignature>;
  }
}
