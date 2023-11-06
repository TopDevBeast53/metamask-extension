import { useEffect, useState } from 'react';
import fetchWithCache from '../../shared/lib/fetch-with-cache';

export function useIsOriginalNativeTokenSymbol(chainId, ticker) {
  const [isOriginalNativeSymbol, setIsOriginalNativeSymbol] = useState(null);

  useEffect(() => {
    async function getNativeTokenSymbol(networkId) {
      try {
        const safeChainsList = await fetchWithCache({
          url: 'https://chainid.network/chains.json',
          functionName: 'getSafeChainsList',
        });

        const matchedChain = safeChainsList.find(
          (network) => network.chainId === parseInt(networkId, 16),
        );

        const matchedSymbol = matchedChain?.nativeCurrency?.symbol ?? null;

        setIsOriginalNativeSymbol(matchedSymbol === ticker);
        return matchedSymbol === ticker;
      } catch (err) {
        return null;
      }
    }
    getNativeTokenSymbol(chainId);
  }, [isOriginalNativeSymbol, chainId, ticker]);

  return isOriginalNativeSymbol;
}
