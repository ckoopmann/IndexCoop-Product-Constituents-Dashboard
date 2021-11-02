import axios from "axios";
import gradstop from "gradstop";
import COMPONENTS from "./productComponentMapping";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DAYS = 30;

async function getMarketCapData(id: string) {
  const apiUrl = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${DAYS}&interval=daily`;
  const response = await axios.get(apiUrl);

  return response.data.market_caps;
}

function ComponentsGraph(props: { name: string }) {
  const [marketCapData, setMarketCapData] = useState<
    Array<Record<string, any>>
  >(
    Array(DAYS)
      .fill({})
      .map(() => {
        return {};
      })
  );
  useEffect(() => {
    for (const { symbol, coingeckoApiId } of COMPONENTS[props.name]) {
      getMarketCapData(coingeckoApiId).then((marketCapsUSD) => {
        const newMarketCapData = marketCapData;
        const addDate = marketCapData[0]?.date == null;
        marketCapsUSD.forEach((value: number[], i: number) => {
          if (newMarketCapData[i]) {
            newMarketCapData[i][symbol] = value[1];
            if (addDate) newMarketCapData[i].date = new Date(value[0]);
          }
        });

        setMarketCapData(newMarketCapData);
        updateTotalMarketCap();
      });
    }
  });

  const [totalMarketCap, setTotalMarketCap] = useState(0);
  function updateTotalMarketCap() {
    setTotalMarketCap(
      calculateTotalMarketCap(marketCapData[marketCapData.length - 1] ?? {})
    );
  }

  const gradient = gradstop({
    stops: COMPONENTS[props.name].length,
    inputFormat: "hex",
    colorArray: ["#343838", "#00DFFC"],
  });

  function formatToBnUSD(value: number) {
    return `$ ${Number(value / 1000000000).toPrecision(4)}bn`;
  }

  function calculateTotalMarketCap(values: Record<string, any>) {
    const sum = Object.entries(values).reduce((total, pair) => {
      const [name, value]: [string, any] = pair;
      if (name !== "date") return total + value;
      return total;
    }, 0);
    return sum;
  }

  function dateFormatter(value: Date) {
    try {
      // Format date based on UTC time to get the same days as in coingecko
      return `${value.getUTCFullYear()}-${value.getUTCMonth()+1}-${value.getUTCDate()}`;
    } catch (e) {
      return "";
    }
  }

  return (
    <div className="ComponentsGraph">
      <h1>
        {props.name} - Total Component Market Cap:{" "}
        {formatToBnUSD(totalMarketCap)}
      </h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          width={500}
          height={400}
          data={marketCapData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={dateFormatter} />
          <YAxis tickFormatter={(value) => `$ ${value / 1000000000}bn`} />
          <Tooltip
            labelFormatter={(value, payload) => {
              const values = payload[0]?.payload;
              if (values != null) {
                const sum = calculateTotalMarketCap(values);
                const sumString = formatToBnUSD(sum);
                return `${dateFormatter(value)} - Total: ${sumString}`;
              }
              return value.toLocaleDateString();
            }}
            formatter={formatToBnUSD}
          />
          {COMPONENTS[props.name].map(({ symbol }, index) => (
            <Area
              type="monotone"
              dataKey={symbol}
              key={symbol}
              stackId="1"
              stroke={gradient[index]}
              fill={gradient[index]}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ComponentsGraph;
