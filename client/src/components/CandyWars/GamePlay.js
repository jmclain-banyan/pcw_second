import React, { Fragment, useState, useEffect } from "react";
// import { StatsDisplay } from "./StatsDisplay";
import { LocationBtns } from "./LocationBtns";
import { ShoppingBtns } from "./ShoppingBtns";
import { LocationMarket } from "./LocationMarket";
import { useSelector, useDispatch } from "react-redux";
import { FightModal, StoreModal, LoanSharkModal } from "./Modals";
import { playerScoreEntry, getTopScores } from "../../actions/candyWarsActions";

export const GamePlay = () => {
  const candy = useSelector((state) => state.candy);
  return candy.currentLocation[0].name === "Home" ? (
    <Fragment>
      <StartGame />
      <LocationBtns />
    </Fragment>
  ) : (
    <Fragment>
      <LocationBtns />
      <ShoppingBtns />
      <LocationMarket />
      {candy.fightModal ? <FightModal /> : null}
      {candy.toggleSurplusStore ? <StoreModal /> : null}
      {candy.toggleLoanShark ? <LoanSharkModal /> : null}
    </Fragment>
  );
};

export const StartGame = () => {
  return (
    <div className="start-dialog">
      <div className="desc">
        <p>
          The government has outlawed candy, and much like the last prohibition
          the people are still thirsty for candy.
        </p>
        <p>
          You see the oppurtunity to make some quick cash, flipping candy
          between markets. It's a free and open black market. Are you ready to make some money?
        </p>
      </div>
      <div className="footer">
        <h3>Pick your starting location...</h3>
      </div>
    </div>
  );
};

export const EndGame = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const player_id = state.auth.user.id;
  const {
    cash,
    loanAmount,
    turnsLeft,
    topScores,
    playerInventory,
    statsExpansion,
    playerWeapons,
    currentHealth,
  } = state.candy;
  const {
    gumDrops, laffyTaffy, pixieStix, gobstoppers, marsBars, jellyBeans, peanutButterCups
  } = playerInventory
  let [player_initials, getUserInitials] = useState("");
  let [submitScoreInput, showSubmitScore] = useState(true);
  let [showLoadingBar, toggleLoadingBar] = useState(false);
  let inventoryScore =
    [gumDrops.owned, laffyTaffy.owned, pixieStix.owned, gobstoppers.owned, marsBars.owned, jellyBeans.owned, peanutButterCups.owned].reduce((a, b) => a + b) * 3;
  let expansionScore =
    Object.values(statsExpansion).filter((bool) => bool === true).length * 5;
  let weaponsScore =
    Object.values(playerWeapons).filter((bool) => bool === true).length * 8;
  let healthScore = Math.round(currentHealth / 2);

  let score =
    Math.round((cash - loanAmount) / 10) +
    (inventoryScore + expansionScore + weaponsScore + healthScore) -
    turnsLeft;

  useEffect(() => getTopScores(dispatch));

  const restart = () => dispatch({ type: "RESTART_GAME" });

  const submitScore = (e) => {
    e.preventDefault();
    showSubmitScore(!submitScoreInput);
    const body = { player_id, player_initials, score };
    dispatch(playerScoreEntry(body));
    toggleLoadingBar(true);
    setTimeout(() => {
      toggleLoadingBar(false);
    }, 1000);
  };

  const loadingBar = (
    <div className="loading-bar-wrapper">
      <div className="progress">
        <div className="bar"></div>
      </div>
    </div>
  );

  const gameOver = (
    <div className="game-over">
      <div className="header">
        <h3>Game Over</h3>
      </div>
      <div className="score-form">
        <form
          action="/candyWars/scoreEntry"
          method="POST"
          onSubmit={submitScore}
        >
          <p>
            Your score:
            <span>
              <input type="number" name="score" value={score} disabled />
            </span>
          </p>
          <input
            type="text"
            name="player_initials"
            placeholder="???"
            onChange={(e) => getUserInitials(e.target.value)}
            maxLength="3"
          />
          <button type="submit">Submit score</button>
        </form>
      </div>
    </div>
  );

  const topScoreElements = topScores.map((card, key) => {
    if (card === null) card = { player_initials: "", score: "" };
    return (
      <div className="score-card" key={key}>
        <span>#{key + 1}</span>
        <span>{card.player_initials.toUpperCase()}</span>
        <span>{card.score}</span>
      </div>
    );
  });

  const topScoresWrapper = (
    <div className="top-scores-container" onLoad={() => getTopScores()}>
      <div className="header">
        <h3>HIGH SCORES</h3>
      </div>
      <div className="top-scores-wrapper">
        <div className="top-scores-header">
          <span>Place</span>
          <span>Player</span>
          <span>Score</span>
        </div>
        <div className="top-scores">{topScoreElements}</div>
      </div>
      <div className="btn">
        <button onClick={restart}>Replay Game</button>
      </div>
    </div>
  );

  return (
    <Fragment>
      {showLoadingBar
        ? loadingBar
        : submitScoreInput
        ? gameOver
        : topScoresWrapper}
      {/* {submitScoreInput ? gameOver : topScores} */}
    </Fragment>
  );
};
