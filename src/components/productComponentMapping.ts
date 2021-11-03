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
    {
      symbol: "WAXE",
      coingeckoApiId: "waxe",
    },
    {
      symbol: "AUDIO",
      coingeckoApiId: "audius",
    },
    {
      symbol: "DG",
      coingeckoApiId: "decentral-games",
    },
    {
      symbol: "ERN",
      coingeckoApiId: "ethernity-chain",
    },
    {
      symbol: "WHALE",
      coingeckoApiId: "whale",
    },
    {
      symbol: "RARI",
      coingeckoApiId: "rarible",
    },
    {
      symbol: "TVK",
      coingeckoApiId: "terra-virtua-kolect",
    },
    {
      symbol: "REVV",
      coingeckoApiId: "revv",
    },
    {
      symbol: "NFTX",
      coingeckoApiId: "nftx",
    },
  ],
  DATA: [
    {
      symbol: "GRT",
      coingeckoApiId: "the-graph",
    },
    {
      symbol: "LINK",
      coingeckoApiId: "the-graph",
    },
    {
      symbol: "FIL",
      coingeckoApiId: "filecoin",
    },
    {
      symbol: "BAT",
      coingeckoApiId: "basic-attention-token",
    },
    {
      symbol: "LPT",
      coingeckoApiId: "livepeer",
    },
    {
      symbol: "OCEAN",
      coingeckoApiId: "ocean-protocol",
    },
    {
      symbol: "NMR",
      coingeckoApiId: "numeraire",
    },
  ],
};

export default COMPONENTS;
