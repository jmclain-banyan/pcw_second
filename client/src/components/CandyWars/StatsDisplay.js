import React from "react";
import { useSelector } from "react-redux";

export const StatsDisplay = () => {
  const candy = useSelector((state) => state.candy);
  return (
    <div className="stats-display-wrapper">
      <div className="player-stats">
        <p>
          Cash: <span>${candy.cash}</span>
        </p>
        <p>
          Health: <span>{candy.currentHealth}</span> / {candy.maxHealth}
        </p>
        <p>
          Inventory space: <span>{candy.currentInventorySize}</span> /{" "}
          {candy.maxInventorySize}
        </p>
        <p>
          Turns left: <span>{candy.turnsLeft}</span>
        </p>
        <p>
          Current location: <span>{candy.currentLocation[0].name}</span>
        </p>
        <p>
          Loan amount owed: <span>${candy.loanAmount}</span>
        </p>
      </div>
      <PlayerInventory />
    </div>
  );
};

const PlayerInventory = () => {
  const candy = useSelector((state) => state.candy);
  return (
    <ul className="player-inventory">
      {Object.keys(candy.playerInventory).map((item, key) => {
        return (
          <li key={key}>
            <span>{item}</span> : <span>{ candy.playerInventory[item].owned } </span>
            @ <span>${candy.playerInventory[item].atPrice}</span>
          </li>
        );
      })}
    </ul>
  );
};
