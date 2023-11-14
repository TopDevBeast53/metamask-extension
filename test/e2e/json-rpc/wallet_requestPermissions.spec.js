const { strict: assert } = require('assert');
const {
  DAPP_URL,
  defaultGanacheOptions,
  switchToNotificationWindow,
  switchToOrOpenDapp,
  withFixtures,
  unlockWallet,
} = require('../helpers');
const FixtureBuilder = require('../fixture-builder');

describe('wallet_requestPermissions', function () {
  it('executes a request permissions on eth_accounts event', async function () {
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder()
          .withPermissionControllerConnectedToTestDapp()
          .build(),
        ganacheOptions: defaultGanacheOptions,
        title: this.test.fullTitle(),
      },
      async ({ driver }) => {
        await driver.navigate();
        await unlockWallet(driver);

        // wallet_requestPermissions
        await driver.openNewPage(DAPP_URL);

        const requestPermissionsRequest = JSON.stringify({
          jsonrpc: '2.0',
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });

        await driver.executeScript(
          `window.ethereum.request(${requestPermissionsRequest})`,
        );

        await switchToNotificationWindow(driver);

        await driver.clickElement({
          text: 'Next',
          tag: 'button',
        });

        await driver.clickElement({
          text: 'Connect',
          tag: 'button',
        });

        await switchToOrOpenDapp(driver);

        const getPermissionsRequest = JSON.stringify({
          method: 'wallet_getPermissions',
        });

        const getPermissions = await driver.executeScript(
          `return window.ethereum.request(${getPermissionsRequest})`,
        );

        assert.strictEqual(getPermissions[0].parentCapability, 'eth_accounts');
      },
    );
  });
});
