import {
  generateMarket,
  intercept,
  fightRun,
  generateBandits,
} from "./functions/candyWarsFuncs";

const initialState = {
  cash: 100,
  turnsLeft: 31,
  currentInventorySize: 0,
  maxInventorySize: 20,
  currentHealth: 100,
  maxHealth: 100,
  fightModal: false,
  runFight: false,
  tryFight: false,
  runAwayHit: null,
  bandits: 0,
  banditsHealth: null,
  banditsMaxDamageDeal: 8,
  playerMaxDamageDeal: 5,
  playerHitAmount: null,
  banditHitAmount: null,
  playerInventory: {
    gumDrops: { owned: 0, atPrice: 0, history: [] },
    laffyTaffy: { owned: 0, atPrice: 0, history: [] },
    pixieStix: { owned: 0, atPrice: 0, history: [] },
    gobstoppers: { owned: 0, atPrice: 0, history: [] },
    marsBars: { owned: 0, atPrice: 0, history: [] },
    jellyBeans: { owned: 0, atPrice: 0, history: [] },
    peanutButterCups: { owned: 0, atPrice: 0, history: [] },
  },
  toggleSurplusStore: false,
  statsExpansion: {
    bodyArmor: false,
    armorPlating: false,
    backPack: false,
    trenchCoat: false,
    duffleBag: false,
  },
  playerWeapons: {
    ringPops: false,
    sugarCaneBat: false,
    nerfPistol: false,
    bazookaGum: false,
  },
  toggleLoanShark: false,
  loanAmount: 0,
  currentLocation: [
    {
      name: "Home",
      locationId: "home",
      availableProduct: [],
    },
  ],
  locations: [
    {
      name: "Candy Land",
      locationId: "candyLand",
      availableProduct: [],
    },
    {
      name: "Hershey Park",
      locationId: "hersheyPark",
      availableProduct: [],
    },
    {
      name: "Land of Oz",
      locationId: "landOfOz",
      availableProduct: [],
    },
    {
      name: "Willy Wonka's Factory",
      locationId: "wonkaFactory",
      availableProduct: [],
    },
    {
      name: "Knott's Berry Farm",
      locationId: "knottsFarm",
      availableProduct: [],
    },
  ],
  topScores: [],
};

export const candyWarsReducer = (state = initialState, action) => {
  let selectedLocation = state.locations.filter(
    (x) => action.payload === x.locationId
  );
  let selectedProduct = state.currentLocation[0].availableProduct.filter(
    (x) => action.payload === x.productId
  );
  let _product = selectedProduct[0];
  let _weapons = state.playerWeapons;
  let _expansion = state.statsExpansion;

  const calculateInventorySpace = (state) => {
    let gumDrops = state.playerInventory.gumDrops.owned;
    let laffyTaffy = state.playerInventory.laffyTaffy.owned;
    let pixieStix = state.playerInventory.pixieStix.owned;
    let gobstoppers = state.playerInventory.gobstoppers.owned;
    let marsBars = state.playerInventory.marsBars.owned;
    let jellyBeans = state.playerInventory.jellyBeans.owned;
    let peanutButterCups = state.playerInventory.peanutButterCups.owned
    return (
      gumDrops + laffyTaffy + pixieStix + gobstoppers + marsBars + jellyBeans + peanutButterCups
    );
  };

  switch (action.type) {
    case "UPDATE_LOCATION":
      let banditsGEN = generateBandits(1, 5);
      let banditsHP = (state.banditsHealth = banditsGEN * 30);
      let loanInterest = Math.round(state.loanAmount * 0.2);
      selectedLocation[0].availableProduct = generateMarket();
      return Object.assign({}, state, {
        currentLocation: selectedLocation,
        turnsLeft: (state.turnsLeft -= 1),
        fightModal: intercept(),
        runFight: false,
        bandits: banditsGEN,
        banditsHealth: banditsHP,
        runAwayHit: null,
        loanAmount: (state.loanAmount += loanInterest),
      });

    case "INCREMENT_PURCHSE":
      if (_product.quanity) _product.toBePurchsed += 1;
      _product.quanity > 0 ? (_product.quanity -= 1) : (_product.quanity = 0);
      return Object.assign({}, state, {});

    case "DECREMENT_PURCHSE":
      if (_product.toBePurchsed) _product.quanity += 1;
      _product.toBePurchsed > 0
        ? (_product.toBePurchsed -= 1)
        : (_product.toBePurchsed = 0);
      return Object.assign({}, state, {});

    case "HANDLE_PURCHSE":
      let purchsePrice = _product.toBePurchsed * _product.price;
      state.playerInventory[_product.productId].owned += _product.toBePurchsed;
      state.cash -= purchsePrice;
      _product.toBePurchsed = 0;

      state.playerInventory[_product.productId].history.push(purchsePrice);
      let history = state.playerInventory[_product.productId].history.reduce(
        (a, b) => a + b
      );
      state.playerInventory[_product.productId].atPrice = Math.ceil(
        history / state.playerInventory[_product.productId].owned
      );

      return Object.assign({}, state, { currentInventorySize: calculateInventorySpace(state) });

    case "INCREMENT_SALE":
      if (state.playerInventory[_product.productId]) _product.toBeSold += 1;
      return Object.assign({}, state, {});

    case "DECREMENT_SALE":
      if (_product.toBeSold) _product.toBeSold -= 1;
      return Object.assign({}, state, {});

    case "HANDLE_SALE":
      if (_product.toBeSold) {
        state.cash += _product.toBeSold * _product.price;
        state.playerInventory[_product.productId].owned -= _product.toBeSold;
        state.playerInventory[_product.productId].atPrice = 0;
        state.playerInventory[_product.productId].history = []
        _product.quanity += _product.toBeSold;
        _product.toBeSold = 0;
      }
      return Object.assign({}, state, { currentInventorySize: calculateInventorySpace(state) })

    case "HEAL":
      let healCost = (state.maxHealth - state.currentHealth) * 3;
      let healAmount = state.maxHealth - state.currentHealth;
      return Object.assign({}, state, {
        cash: (state.cash -= healCost),
        currentHealth: (state.currentHealth += healAmount),
      });

    case "RUN_ATTEMPT":
      let runHit = Math.round(Math.random() * 6);
      return Object.assign({}, state, {
        runAwayHit: runHit,
        runFight: fightRun(),
        currentHealth: (state.currentHealth -= runHit),
      });

    case "FIGHT_ATTEMPT":
      let playerHit = Math.round(Math.random() * state.playerMaxDamageDeal);
      let banditHit = Math.round(
        Math.random() * (state.bandits * state.banditsMaxDamageDeal)
      );
      return Object.assign({}, state, {
        tryFight: true,
        currentHealth: (state.currentHealth -= banditHit),
        banditsHealth: (state.banditsHealth -= playerHit),
        playerHitAmount: playerHit,
        banditHitAmount: banditHit,
        runAwayHit: null,
      });

    case "CLOSE_FIGHT":
      return Object.assign({}, state, { fightModal: false, tryFight: false });

    case "TOGGLE_STORE":
      return Object.assign({}, state, {
        toggleSurplusStore: !state.toggleSurplusStore,
      });

    case "PURCHSE_BODYARMOR":
      _expansion.bodyArmor = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 250),
        maxHealth: (state.maxHealth += 25),
      });

    case "PURCHSE_ARMORPLATING":
      _expansion.armorPlating = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 600),
        maxHealth: (state.maxHealth += 50),
      });

    case "PURCHSE_TRENCHCOAT":
      _expansion.trenchCoat = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 150),
        maxInventorySize: (state.maxInventorySize += 15),
      });

    case "PURCHSE_BACKPACK":
      _expansion.backPack = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 250),
        maxInventorySize: (state.maxInventorySize += 25),
      });

    case "PURCHSE_DUFFLEBAG":
      _expansion.duffleBag = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 500),
        maxInventorySize: (state.maxInventorySize += 50),
      });

    case "PURCHSE_RINGPOPS":
      _weapons.ringPops = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 100),
        playerMaxDamageDeal: (state.playerMaxDamageDeal += 5),
      });

    case "PURCHSE_SUGARCANE":
      _weapons.sugarCaneBat = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 200),
        playerMaxDamageDeal: (state.playerMaxDamageDeal += 10),
      });

    case "PURCHSE_NERF":
      _weapons.nerfPistol = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 500),
        playerMaxDamageDeal: (state.playerMaxDamageDeal += 15),
      });

    case "PURCHSE_BAZOOKA":
      _weapons.bazookaGum = true;
      return Object.assign({}, state, {
        cash: (state.cash -= 1000),
        playerMaxDamageDeal: (state.playerMaxDamageDeal += 30),
      });

    case "TOGGLE_LOAN":
      return Object.assign({}, state, {
        toggleLoanShark: !state.toggleLoanShark,
      });

    case "GET_LOAN":
      return Object.assign({}, state, {
        cash: (state.cash += action.payload),
        loanAmount: (state.loanAmount += action.payload),
      });

    case "PAYBACK_LOAN":
      return Object.assign({}, state, {
        cash: (state.cash -= state.loanAmount),
        loanAmount: 0,
      });

    case "RESTART_GAME":
      return Object.assign({}, state, {
        ...initialState,
        turnsLeft: 31,
        playerInventory: {
          gumDrops: { owned: 0, atPrice: 0, history: [] },
          laffyTaffy: { owned: 0, atPrice: 0, history: [] },
          pixieStix: { owned: 0, atPrice: 0, history: [] },
          gobstoppers: { owned: 0, atPrice: 0, history: [] },
          marsBars: { owned: 0, atPrice: 0, history: [] },
          jellyBeans: { owned: 0, atPrice: 0, history: [] },
          test: { owned: 0, atPrice: 0, history: [] },
        },
        statsExpansion: {
          bodyArmor: false,
          armorPlating: false,
          backPack: false,
          trenchCoat: false,
          duffleBag: false,
        },
        playerWeapons: {
          ringPops: false,
          sugarCaneBat: false,
          nerfPistol: false,
          bazookaGum: false,
        },
      });
    case "GET_TOP_SCORES":
      return Object.assign({}, state, {
        topScores: action.payload,
      });

    default:
      return state;
  }
};
