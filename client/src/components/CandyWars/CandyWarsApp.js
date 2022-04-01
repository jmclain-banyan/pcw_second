import React from "react";
import { useSelector } from "react-redux";
// import {StatsDisplay} from './StatsDisplay'
import { GamePlay, EndGame } from "./GamePlay";
import { StatsDisplay } from "./StatsDisplay";

export const CandyWarsApp = () => {
  const candy = useSelector((state) => state.candy);
  return (
    <div className="candy-wars-app">
      {candy.currentLocation[0].name !== 'Home' ? <StatsDisplay/> : null}
      {(!candy.turnsLeft || candy.currentHealth <= 0) ? <EndGame /> : <GamePlay />}
    </div>
  );
};
