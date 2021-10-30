import axios from "axios";
import { useState, useEffect } from "react";

const COMPONENTS: Record<
  string,
  Array<{ symbol: string; coingeckoApiId: string }>
> = {
  DPI: [
    {
      symbol: "YFI",
      coingeckoApiId: "yearn-finance",
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
