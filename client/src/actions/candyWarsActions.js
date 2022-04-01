import axios from "axios";
import { tokenConfig } from "./tokenConfig";

export const playerScoreEntry = ({ player_id, player_initials, score }) => (
  dispatch,
  getState
) => {
  const body = JSON.stringify({ player_id, player_initials, score });
  axios
    .post("/candywars/newscore", body, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    })
    .catch((err) => console.log(err));
};

export const getTopScores = (dispatch) => {
  axios
    .get("/candywars/getscores")
    .then((res) => {
      dispatch({ type: "GET_TOP_SCORES", payload: res.data });
    })
    .catch((err) => console.log(err));
};
