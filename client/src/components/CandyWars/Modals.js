import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export const FightModal = () => {
  const state = useSelector((state) => state.candy);
  const dispatch = useDispatch();

  let [fightImg, showFightImg] = useState(false);

  const attemptRun = () => dispatch({ type: "RUN_ATTEMPT" });
  const closeFight = () => dispatch({ type: "CLOSE_FIGHT" });
  const attemptFight = () => {
    showFightImg(true);
    setTimeout(() => {
      dispatch({ type: "FIGHT_ATTEMPT" });
      showFightImg(false);
    }, 1200);
  };

  const fightCloudImg = (
    <img src="/img/fight-cloud.png" class="fight-cloud" alt="fight cloud" />
  );

  const fightModalContents = (
    <Fragment>
      <div className="fight-modal_health">
        <div className="bandit-health">
          <span className="b-hp-label">Bandits health</span>
          <br />
          <span className="b-hp">{state.banditsHealth}</span>
        </div>
        <div className="player-health">
          <span className="p-hp-label">Player health</span>
          <br />
          <span className="p-hp">{state.currentHealth}</span>
        </div>
      </div>

      <div className="fight-modal_dialog">
        {!state.tryFight && state.runAwayHit === null && (
          <p>
            You've been intercepted by <span>{state.bandits} </span>bandits
          </p>
        )}
        {state.runAwayHit === null && state.tryFight && (
          <p>
            You attack and deal <span>{state.playerHitAmount} </span>damage to
            the bandits, they deal <span>{state.banditHitAmount} </span>damage
            to you.
          </p>
        )}
        {state.runAwayHit !== null && (
          <p>
            You took <span>{state.runAwayHit} </span>damage trying to get away
          </p>
        )}
        {(state.runFight || state.banditsHealth <= 0) && (
          <div className="fight-modal_dialog-exit">
            {state.banditsHealth <= 0 && <p>You won!</p>}
            {state.runFight && <p>You successfully got away</p>}
            <button onClick={closeFight}>Exit</button>
          </div>
        )}
      </div>

      <div className="fight-action-btns">
        {!state.runFight && state.banditsHealth > 0 ? (
          <Fragment>
            <button onClick={attemptFight}>
              Fight <i className="fas fa-candy-cane"></i>
            </button>
            <button onClick={attemptRun}>
              Run <i className="fas fa-running"></i>
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <button disabled>
              Fight <i className="fas fa-candy-cane"></i>
            </button>
            <button disabled>
              Run <i className="fas fa-running"></i>
            </button>
          </Fragment>
        )}
      </div>
    </Fragment>
  );

  return (
    <div className="fight-modal-container">
      <div className="fight-modal">
        {fightImg ? fightCloudImg : fightModalContents}
      </div>
    </div>
  );
};

export const StoreModal = () => {
  const state = useSelector((state) => state.candy);
  const dispatch = useDispatch();

  const _expansion = state.statsExpansion;
  const _weapons = state.playerWeapons;

  const exitStore = () => dispatch({ type: "TOGGLE_STORE" });
  const bodyArmor = () => dispatch({ type: "PURCHSE_BODYARMOR" });
  const armorPlating = () => dispatch({ type: "PURCHSE_ARMORPLATING" });
  const trenchCoat = () => dispatch({ type: "PURCHSE_TRENCHCOAT" });
  const backPack = () => dispatch({ type: "PURCHSE_BACKPACK" });
  const duffleBag = () => dispatch({ type: "PURCHSE_DUFFLEBAG" });
  const ringPops = () => dispatch({ type: "PURCHSE_RINGPOPS" });
  const sugarCane = () => dispatch({ type: "PURCHSE_SUGARCANE" });
  const nerfPistol = () => dispatch({ type: "PURCHSE_NERF" });
  const bazookaGum = () => dispatch({ type: "PURCHSE_BAZOOKA" });

  return (
    <div className="store-modal-container">
      <div className="store-modal">
        <button
          className="fas fa-times fa-2x store-modal-close"
          onClick={exitStore}
        />
        <h3>Surplus Store</h3>
        <div>
          {!_expansion.bodyArmor ? (
            <p>Body Armor +25 max health</p>
          ) : (
            <p>Body Armor equipped</p>
          )}
          {_expansion.bodyArmor ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 250 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={bodyArmor}>
              Buy $250
            </button>
          )}
        </div>
        <div>
          {!_expansion.armorPlating ? (
            <p>Armor Plating +50 max health</p>
          ) : (
            <p>Armor Plating equipped</p>
          )}
          {_expansion.armorPlating ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 600 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={armorPlating}>
              Buy $600
            </button>
          )}
        </div>
        <div>
          {!_expansion.trenchCoat ? (
            <p>Trench Coat +15 max inventory</p>
          ) : (
            <p>Trench Coat equipped</p>
          )}
          {_expansion.trenchCoat ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 150 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={trenchCoat}>
              Buy $150
            </button>
          )}
        </div>
        <div>
          {!_expansion.backPack ? (
            <p>Backpack +25 max inventory</p>
          ) : (
            <p>Backpack equipped</p>
          )}
          {_expansion.backPack ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 250 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={backPack}>
              Buy $250
            </button>
          )}
        </div>
        <div>
          {!_expansion.duffleBag ? (
            <p>Duffle Bag +50 max inventory</p>
          ) : (
            <p>Duffle Bag equipped</p>
          )}
          {_expansion.duffleBag ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 500 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={duffleBag}>
              Buy $500
            </button>
          )}
        </div>
        <div>
          {!_weapons.ringPops ? (
            <p>Ring Pops +5 max damage</p>
          ) : (
            <p>Ring Pops equipped</p>
          )}
          {_weapons.ringPops ? (
            <button className="equipped" disabled>
              {" "}
              Already owned
            </button>
          ) : state.cash - 100 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={ringPops}>
              Buy $100
            </button>
          )}
        </div>
        <div>
          {!_weapons.sugarCaneBat ? (
            <p>Sugar Cane Bat +10 max damage</p>
          ) : (
            <p>Sugar Cane Bat equipped</p>
          )}
          {_weapons.sugarCaneBat ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 200 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={sugarCane}>
              Buy $200
            </button>
          )}
        </div>
        <div>
          {!_weapons.nerfPistol ? (
            <p>Nerf Pistol +15 max damage</p>
          ) : (
            <p>Nerf Pistol equipped</p>
          )}
          {_weapons.nerfPistol ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 500 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={nerfPistol}>
              Buy $500
            </button>
          )}
        </div>
        <div>
          {!_weapons.bazookaGum ? (
            <p>Bazooka Gum +30 max damage</p>
          ) : (
            <p>Bazooka Gum equipped</p>
          )}
          {_weapons.bazookaGum ? (
            <button className="equipped" disabled>
              Already owned
            </button>
          ) : state.cash - 1000 < 0 ? (
            <button className="insufFicient-cash" disabled>
              Not enough cash
            </button>
          ) : (
            <button className="purchse" onClick={bazookaGum}>
              Buy $1000
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const LoanSharkModal = () => {
  const state = useSelector((state) => state.candy);
  const dispatch = useDispatch();

  const getLoan = (num) =>
    dispatch({ type: "GET_LOAN", payload: num });
  const paybackLoan = () => dispatch({ type: "PAYBACK_LOAN" });

  return (
    <div className="loan-shark-container">
      <div className="loan-shark-modal">
        <i
          className="fas fa-times fa-2x close-btn"
          onClick={() => dispatch({ type: "TOGGLE_LOAN" })}
        />
        <div className='header'>
        <h3>The Loan Shark</h3>
        <p>Get some extra cash @ 20% interest per turn</p>
        </div>
        <div className="dialog"></div>
        <div className="loan-amount-btns">
          <button onClick={() => getLoan(50)}>
          <span>$50</span>
          </button>
          <button onClick={() => getLoan(100)}>
            <span>$100</span>
          </button>
          <button onClick={() => getLoan(250)}>
            <span>$250</span>
          </button>
          <button onClick={() => getLoan(500)}>
            <span>$500</span>
          </button>
          <button onClick={() => getLoan(1000)}>
            <span>$1000</span>
          </button>
        </div>
        <div className="payback-btn">
        {state.loanAmount > 0 && state.cash > state.loanAmount ? (
          <button onClick={paybackLoan}>
            Payback the Shark your loan of ${state.loanAmount}
          </button>
        ) : (
          <button disabled>
            {state.loanAmount === 0
              ? "There is no loan to payback"
              : state.loanAmount > state.cash
              ? "You don't have enough cash to payback the loan"
              : null}
          </button>
        )}
        </div>
      </div>
    </div>
  );
};
