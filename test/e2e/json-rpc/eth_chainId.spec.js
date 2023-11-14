const { strict: assert } = require('assert');
const { DAPP_URL, defaultGanacheOptions, withFixtures } = require('../helpers');
const FixtureBuilder = require('../fixture-builder');

describe('eth_chainId', function () {
  it('returns the chain ID of the current network', async function () {
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
        await driver.fill('#password', 'correct horse battery staple');
        await driver.press('#password', driver.Key.ENTER);

        // eth_chainId
        await driver.openNewPage(DAPP_URL);
        const request = JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_chainId',
          params: [],
          id: 0,
        });
        const result = await driver.executeScript(
          `return window.ethereum.request(${request})`,
        );

        assert.equal(result, '0x539');
      },
    );
  });
});
