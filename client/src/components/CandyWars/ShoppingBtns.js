import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const ShoppingBtns = () => {
  const candy = useSelector((state) => state.candy);
  const dispatch = useDispatch();
  const healAction = () => dispatch({ type: "HEAL" });
  const toggleSurplusStore = () => dispatch({ type: "TOGGLE_STORE" });
  const toggleLoanShark = () => dispatch({ type: 'TOGGLE_LOAN' })
  return (
    <div className="shopping-btns-wrapper">
      <button onClick={toggleSurplusStore}>
        <i className="fas fa-play" /> Surplus Store{" "}
        <i className="fas fa-play" />
      </button>
      <button onClick={toggleLoanShark}> <i className="fas fa-donate" /> Loan Shark <i className="fas fa-donate" /></button>
      {candy.cash < (candy.maxHealth - candy.currentHealth) * 3 ? 
      <button disabled>
        <i className="fas fa-hospital" /> Heal for $ {(candy.maxHealth - candy.currentHealth) * 3} <i className="fas fa-hospital" />
      </button> 
      :
      <button onClick={healAction}>
         <i className="fas fa-hospital" /> Heal for $ {(candy.maxHealth - candy.currentHealth) * 3} <i className="fas fa-hospital" />
      </button>
      }
    </div>
  );
};
