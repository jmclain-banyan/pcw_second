import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const LocationMarket = () => {
  const candy = useSelector((state) => state.candy);
  const dispatch = useDispatch();

  const incrementPurchse = (e) =>
    dispatch({ type: "INCREMENT_PURCHSE", payload: e.target.name });
  const decrementPurchse = (e) =>
    dispatch({ type: "DECREMENT_PURCHSE", payload: e.target.name });
  const handlePurchse = (e) =>
    dispatch({ type: "HANDLE_PURCHSE", payload: e.target.name });

  const incrementSale = (e) =>
    dispatch({ type: "INCREMENT_SALE", payload: e.target.name });
  const decrementSale = (e) =>
    dispatch({ type: "DECREMENT_SALE", payload: e.target.name });
  const handleSale = (e) =>
    dispatch({ type: "HANDLE_SALE", payload: e.target.name });

  const productMarket = candy.currentLocation[0].availableProduct.map(
    (item, key) => {
      return (
        <div className="product-container" key={key}>
          <h3>{item.name}</h3>
          <span className="product-info">
            Quanity: {item.quanity} || Price: ${item.price}
          </span>

          <div className="buy-wrapper">
            <button
              className="increment-btn fas fa-arrow-up"
              name={item.productId}
              onClick={incrementPurchse}
            />
            <input type="tel" value={item.toBePurchsed} disabled />
            <button
              className="decrement-btn fas fa-arrow-down"
              name={item.productId}
              onClick={decrementPurchse}
            />
            {candy.cash >= item.toBePurchsed * item.price &&
            candy.currentInventorySize + item.toBePurchsed <
              candy.maxInventorySize + 1 ? (
              <span>
                <button
                  className="buy-btn action-btn"
                  name={item.productId}
                  onClick={handlePurchse}
                >
                  Buy
                </button>
                <div className="buy-info">
                  Purchse @ ${item.toBePurchsed * item.price}
                </div>
              </span>
            ) : (
              <span>
                <button className="buy-btn action-btn" disabled>
                  Buy
                </button>
                <div className="buy-info">Need more cash or space</div>
              </span>
            )}
          </div>
          <div className="sale-wrapper">
            <button
              className="increment-btn fas fa-arrow-up"
              name={item.productId}
              onClick={incrementSale}
            />
            <input type="tel" value={item.toBeSold} disabled />
            <button
              className="decrement-btn fas fa-arrow-down"
              name={item.productId}
              onClick={decrementSale}
            />
            {item.toBeSold <= candy.playerInventory[item.productId].owned ? (
              <span>
                <button
                  className="sale-btn action-btn"
                  name={item.productId}
                  onClick={handleSale}
                >
                  Sell
                </button>
                <div className="sale-info">
                  Sell @ ${item.toBeSold * item.price}
                </div>
              </span>
            ) : (
              <span>
                <button className="sale-btn action-btn" disabled>
                  Sell
                </button>
                <div className="sale-info">You don't have enough</div>
              </span>
            )}
          </div>
        </div>
      );
    }
  );
  return <div className="market-container">{productMarket}</div>;
};
