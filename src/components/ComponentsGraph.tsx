import axios from "axios";
import { useState, useEffect } from "react";

const COMPONENTS: Record<
  string,
  Array<{ symbol: string; coingeckoApiId: string }>
> = {
  DPI: [
    {
      symbol: "UNI",
      coingeckoApiId: "uniswap",
    },
    {
      symbol: "AAVE",
      coingeckoApiId: "aave",
    },
    {
      symbol: "MKR",
      coingeckoApiId: "maker",
    },
    {
      symbol: "SUSHI",
      coingeckoApiId: "sushi",
    },
    {
      symbol: "COMP",
      coingeckoApiId: "compound-governance-token",
    },
    {
      symbol: "SNX",
      coingeckoApiId: "havven",
    },
    {
      symbol: "YFI",
      coingeckoApiId: "yearn-finance",
    },
    {
      symbol: "REN",
      coingeckoApiId: "republic-protocol",
    },
    {
      symbol: "LRC",
      coingeckoApiId: "loopring",
    },
    {
      symbol: "KNC",
      coingeckoApiId: "kyber-network-crystal",
    },
    {
      symbol: "BAL",
      coingeckoApiId: "balancer",
    },
    {
      symbol: "BADGER",
      coingeckoApiId: "badger-dao",
    },
    {
      symbol: "FARM",
      coingeckoApiId: "harvest-finance",
    },
    {
      symbol: "INST",
      coingeckoApiId: "instadapp",
    },
    {
      symbol: "CREAM",
      coingeckoApiId: "cream-2",
    },
    {
      symbol: "VSP",
      coingeckoApiId: "vesper-finance",
    },
    {
      symbol: "MTA",
      coingeckoApiId: "meta",
    },
  ],
};

async function getMarketCapData(id: string) {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`;
  const response = await axios.get(apiUrl);
  const marketCapsUSD = response.data.market_caps.map(
    (arr: number[]) => arr[1]
  );
  return marketCapsUSD;
}

function ComponentsGraph(props: { name: string }) {
  const [marketCapData, setMarketCapData] = useState<Record<string, number[]>>(
    {}
  );
  useEffect(() => {
    for (const { symbol, coingeckoApiId } of COMPONENTS[props.name]) {
      getMarketCapData(coingeckoApiId).then((marketCapsUSD) => {
        const newMarketCapData = marketCapData;
        newMarketCapData[symbol] = marketCapsUSD;

        setMarketCapData(newMarketCapData);
      });
    }
  });
  return (
    <div className="ComponentsGraph">
      <h1>{props.name}</h1>
    </div>
  );
}

export default ComponentsGraph;
