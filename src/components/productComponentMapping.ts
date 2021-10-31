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
  MVI: [
    {
      symbol: "MANA",
      coingeckoApiId: "decentraland",
    },
    {
      symbol: "ILV",
      coingeckoApiId: "illuvium",
    },
    {
      symbol: "AXS",
      coingeckoApiId: "axie-infinity",
    },
    {
      symbol: "SAND",
      coingeckoApiId: "the-sandbox",
    },
    {
      symbol: "ENJ",
      coingeckoApiId: "enjincoin",
    },
  ],
};

export default COMPONENTS;
