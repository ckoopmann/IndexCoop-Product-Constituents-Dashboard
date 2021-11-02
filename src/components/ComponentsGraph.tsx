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
  Text,
} from "recharts";

const DAYS = 30;

const indexCoingeckoMapping: Record<string, string> = {
  DPI: "defipulse-index",
  MVI: "metaverse-index",
  DATA: "data-economy-index",
};

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
  const [marketCapsLoaded, setMarketCapsLoaded] = useState(false);
  const [marketCapsLoading, setMarketCapsLoading] = useState(false);
  useEffect(() => {
    if (!(marketCapsLoaded || marketCapsLoading)) {
      setMarketCapsLoading(true);
      console.log("Loading Market caps");
      const promises = COMPONENTS[props.name].map(
        ({ symbol, coingeckoApiId }) => {
          return getMarketCapData(coingeckoApiId).then((marketCapsUSD) => {
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
      );
      Promise.all(promises)
        .then(() => {
          console.log("Market caps loaded");
          setMarketCapsLoaded(true);
        })
        .finally(() => setMarketCapsLoading(false));
    }
  });

  const [aumData, setAumData] = useState<Array<Record<string, any>>>(
    Array(DAYS)
      .fill({})
      .map(() => {
        return {};
      })
  );
  const [aumLoaded, setAumLoaded] = useState(false);

  const [combinedData, setCombinedData] = useState<Array<Record<string, any>>>(
    Array(DAYS)
      .fill({})
      .map(() => {
        return {};
      })
  );
  useEffect(() => {
    if (aumLoaded && marketCapsLoaded) {
      const newCombinedData = combinedData;
      aumData.forEach((value: Record<string, any>, i: number) => {
        if (newCombinedData[i]) {
          newCombinedData[i].date = value.date;
          newCombinedData[i].aum = value[props.name];
          newCombinedData[i].componentMarketCap = calculateTotalMarketCap(
            marketCapData[i]
          );
          newCombinedData[i].ratio =
            value[props.name] / newCombinedData[i].componentMarketCap;
        }
      });
      setCombinedData(newCombinedData);
    }
  }, [aumLoaded, marketCapsLoaded]);

  const [currentAum, setCurrentAum] = useState(0);
  useEffect(() => {
    if (!aumLoaded) {
      getMarketCapData(indexCoingeckoMapping[props.name]).then((aumsUSD) => {
        const newAumData = aumData;
        aumsUSD.forEach((value: number[], i: number) => {
          if (newAumData[i]) {
            newAumData[i][props.name] = value[1];
            newAumData[i].date = new Date(value[0]);
          }
        });
        setAumData(newAumData);
        setCurrentAum(aumsUSD[aumsUSD.length - 1][1]);
        setAumLoaded(true);
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

  function formatToMnUSD(value: number) {
    return `$ ${Number(value / 1000000).toPrecision(4)}m`;
  }

  function formatToPercent(value: number, precision: number = 4) {
    return `${Number(value * 100).toPrecision(precision)}%`;
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
      return `${value.getUTCFullYear()}-${
        value.getUTCMonth() + 1
      }-${value.getUTCDate()}`;
    } catch (e) {
      return "";
    }
  }

  return (
    <div className="ComponentsGraph">
      <h1>{props.name}</h1>
      <div>
        <h3>Total Component Market Cap: {formatToBnUSD(totalMarketCap)}</h3>
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
            <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
            <XAxis dataKey="date" tickFormatter={dateFormatter} />
            <YAxis tickFormatter={(value) => `$ ${value / 1000000000}bn`} />
            <Tooltip
              labelFormatter={(value, payload) => {
                const values = payload[0]?.payload;
                if (values != null) {
                  const sum = calculateTotalMarketCap(values);
                  const sumString = formatToBnUSD(sum);
                  return `${dateFormatter(value)} Total: ${sumString}`;
                }
                return dateFormatter(value);
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
        <div>
          <h3>
            Current AUM: {formatToMnUSD(currentAum)} - Percentage of component
            marketcap: {formatToPercent(currentAum / totalMarketCap)}
          </h3>
          <ResponsiveContainer width="100%" aspect={3}>
            <AreaChart
              width={500}
              height={400}
              data={combinedData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
              <XAxis dataKey="date" tickFormatter={dateFormatter} />
              <YAxis tickFormatter={(value) => formatToPercent(value, 2)} />
              <Tooltip
                labelFormatter={(value, payload) => {
                  const values = payload[0]?.payload;
                  if (values != null) {
                    return `${dateFormatter(value)} AUM: ${formatToMnUSD(
                      values.aum
                    )}, Component Market Cap: ${formatToBnUSD(
                      values.componentMarketCap
                    )} `;
                  }
                  return dateFormatter(value);
                }}
                formatter={(value: number) => formatToPercent(value)}
              />
              <Area type="monotone" dataKey="ratio" key="ratio" stackId="1" />
            </AreaChart>
          </ResponsiveContainer>
        </div>{" "}
      </div>
    </div>
  );
}

export default ComponentsGraph;
