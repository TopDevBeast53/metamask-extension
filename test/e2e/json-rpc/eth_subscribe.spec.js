const { strict: assert } = require('assert');
const {
  DAPP_URL,
  defaultGanacheOptions,
  unlockWallet,
  withFixtures,
} = require('../helpers');
const FixtureBuilder = require('../fixture-builder');

describe('eth_subscribe', function () {
  it('executes a subscription event', async function () {
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

        // eth_subscribe
        await driver.openNewPage(DAPP_URL);

        const subscribeRequest = JSON.stringify({
          jsonrpc: '2.0',
          method: 'eth_subscribe',
          params: ['newHeads'],
        });

        const subscribe = await driver.executeScript(
          `return window.ethereum.request(${subscribeRequest})`,
        );

        const subscriptionMessage = await driver.executeAsyncScript(
          `const callback = arguments[arguments.length - 1];` +
            `window.ethereum.on('message', (message) => callback(message))`,
        );

        assert.strictEqual(subscribe, subscriptionMessage.data.subscription);
        assert.strictEqual(subscriptionMessage.type, 'eth_subscription');

        // eth_unsubscribe
        const unsubscribeRequest = JSON.stringify({
          jsonrpc: '2.0',
          method: `eth_unsubscribe`,
          params: [`${subscribe}`],
        });

        const unsubscribe = await driver.executeScript(
          `return window.ethereum.request(${unsubscribeRequest})`,
        );

        assert.strictEqual(unsubscribe, true);
      },
    );
  });
});
