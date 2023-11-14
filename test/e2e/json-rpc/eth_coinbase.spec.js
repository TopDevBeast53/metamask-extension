const { strict: assert } = require('assert');
const {
  DAPP_URL,
  defaultGanacheOptions,
  unlockWallet,
  withFixtures,
} = require('../helpers');
const FixtureBuilder = require('../fixture-builder');

describe('eth_coinbase', function () {
  it('executes a eth_coinbase json rpc call', async function () {
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

        // eth_coinbase
        await driver.openNewPage(DAPP_URL);

        const coinbaseRequest = JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_coinbase',
        });

        const coinbase = await driver.executeScript(
          `return window.ethereum.request(${coinbaseRequest})`,
        );

        assert.deepStrictEqual(
          coinbase,
          '0x5cfe73b6021e818b776b421b1c4db2474086a7e1',
        );
      },
    );
  });
});
