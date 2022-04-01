export const generateMarket = () => {
  const range = (min, max) => Math.round(Math.random() * (max - min + 1) + min);
  let market = [
    {
      name: "Gum Drops",
      productId: "gumDrops",
      quanity: range(25, 80),
      price: range(2, 8),
      toBePurchsed: 0,
      toBeSold: 0,
    },
    {
      name: "Laffy Taffy",
      productId: "laffyTaffy",
      quanity: range(10, 35),
      price: range(10, 50),
      toBePurchsed: 0,
      toBeSold: 0,
    },
    {
      name: "Pixie Stix",
      productId: "pixieStix",
      quanity: range(5, 50),
      price: range(5, 25),
      toBePurchsed: 0,
      toBeSold: 0,
    },
    {
      name: "Gobstoppers",
      productId: "gobstoppers",
      quanity: range(10, 40),
      price: range(10, 40),
      toBePurchsed: 0,
      toBeSold: 0,
    },
    {
      name: "Mars Bars",
      productId: "marsBars",
      quanity: range(5, 20),
      price: range(20, 80),
      toBePurchsed: 0,
      toBeSold: 0,
    },
    {
      name: "Jelly Beans",
      productId: "jellyBeans",
      quanity: range(10, 60),
      price: range(25, 100),
      toBePurchsed: 0,
      toBeSold: 0,
    },
    {
      name: "Peanutbutter Cups",
      productId: "peanutButterCups",
      quanity: range(5, 65),
      price: range(35, 85),
      toBePurchsed: 0,
      toBeSold: 0,
    },
  ];
  return market;
};

export const intercept = () => {
    let x = Math.floor(Math.random() * 100)
    return x % 9 === 0
}

export const fightRun = () => {
    let x = Math.floor(Math.random() * 100)
    return x % 3 === 0
}

export const generateBandits = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
