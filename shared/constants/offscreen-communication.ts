export enum OffscreenCommunicationTarget {
  trezorOffscreen = 'trezor-offscreen',
  extension = 'extension-offscreen',
}

export enum OffscreenCommunicationEvents {
  trezorDeviceConnect = 'trezor-device-connect',
}

export enum TrezorAction {
  init = 'trezor-init',
  dispose = 'trezor-dispose',
  getPublicKey = 'trezor-get-public-key',
  signTransaction = 'trezor-sign-transaction',
  signMessage = 'trezor-sign-message',
  signTypedData = 'trezor-sign-typed-data',
}
