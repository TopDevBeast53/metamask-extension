import React from 'react';
import configureMockStore from 'redux-mock-store';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProvider } from '../../../../../test/jest/rendering';
import { defaultNetworksData } from '../networks-tab.constants';
import NetworksTabContent from '.';
import { getEthChainIdDecFromCaipChainId } from '@metamask/controller-utils';

const mockState = {
  metamask: {
    providerConfig: {
      caipChainId: 'eip155:1337',
      nickname: '',
      rpcPrefs: {},
      rpcUrl: 'http://localhost:8545',
      ticker: 'ETH',
      type: 'localhost',
    },
  },
};

const renderComponent = (props) => {
  const store = configureMockStore([])(mockState);
  return renderWithProvider(<NetworksTabContent {...props} />, store);
};

const defaultNetworks = defaultNetworksData.map((network) => ({
  ...network,
  viewOnly: true,
  isATestNetwork: true,
}));

const props = {
  networkDefaultedToProvider: false,
  networkIsSelected: true,
  networksToRender: defaultNetworks,
  selectedNetwork: {
    rpcUrl: 'http://localhost:8545',
    caipChainId: 'eip155:1337',
    ticker: 'ETH',
    label: 'LocalHost',
    blockExplorerUrl: '',
    viewOnly: false,
    rpcPrefs: {},
    isATestNetwork: true,
  },
  shouldRenderNetworkForm: true,
};

describe('NetworksTabContent Component', () => {
  it('should render networks tab content correctly', async () => {
    const { queryByText, getByDisplayValue, getAllByText } =
      renderComponent(props);

    expect(queryByText('Ethereum Mainnet')).toBeInTheDocument();
    expect(queryByText('Goerli test network')).toBeInTheDocument();
    expect(queryByText('Sepolia test network')).toBeInTheDocument();

    expect(queryByText('Network name')).toBeInTheDocument();
    expect(queryByText('New RPC URL')).toBeInTheDocument();
    expect(queryByText('Chain ID')).toBeInTheDocument();
    expect(queryByText('Currency symbol')).toBeInTheDocument();
    expect(queryByText('Block explorer URL')).toBeInTheDocument();
    expect(queryByText('Cancel')).toBeInTheDocument();
    expect(queryByText('Save')).toBeInTheDocument();

    expect(getByDisplayValue(props.selectedNetwork.label)).toBeInTheDocument();
    expect(getByDisplayValue(props.selectedNetwork.rpcUrl)).toBeInTheDocument();
    expect(
      getByDisplayValue(getEthChainIdDecFromCaipChainId(props.selectedNetwork.caipChainId)),
    ).toBeInTheDocument();
    expect(getByDisplayValue(props.selectedNetwork.ticker)).toBeInTheDocument();
    expect(getAllByText(props.selectedNetwork.blockExplorerUrl)).toBeDefined();

    fireEvent.change(getByDisplayValue(props.selectedNetwork.label), {
      target: { value: 'LocalHost 8545' },
    });
    expect(await getByDisplayValue('LocalHost 8545')).toBeInTheDocument();

    fireEvent.change(getByDisplayValue(props.selectedNetwork.rpcUrl), {
      target: { value: 'test' },
    });
    // Getting this from Nock
    // FetchError {
    //   message: 'request to https://chainid.network/chains.json failed, reason: Nock: Disallowed net connect for "chainid.network:443/chains.json"',
    //   type: 'system',
    //   errno: 'ENETUNREACH',
    //   code: 'ENETUNREACH'
    // }
    // Slack suggests this is a local issue only?...
    // expect(
    //   await screen.findByText(
    //     'URLs require the appropriate HTTP/HTTPS prefix.',
    //   ),
    // ).toBeInTheDocument();

    fireEvent.change(getByDisplayValue(getEthChainIdDecFromCaipChainId(props.selectedNetwork.caipChainId)), {
      target: { value: '1' },
    });

    expect(
      await screen.findByText(
        'Could not fetch chain ID. Is your RPC URL correct?',
      ),
    ).toBeInTheDocument();
  });
});