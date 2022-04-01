import React from "react";
import { useSelector, useDispatch } from "react-redux";

export const LocationBtns = () => {
  const state = useSelector((state) => state.candy);
  const dispatch = useDispatch();
  const changeLocation = (e) =>
    dispatch({ type: "UPDATE_LOCATION", payload: e.target.name });

  const locationButtons = state.locations.map((location, key) => {
    return (
      <button
        key={key}
        onClick={changeLocation}
        name={location.locationId}
        id={`${location.locationId}Btn`}
      >
        {location.name}
      </button>
    );
  });
  return <div className="location-btns-wrapper">
      {locationButtons}
  </div>;
};
