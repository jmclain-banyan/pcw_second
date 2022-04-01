import React, { Fragment, useState} from "react";
import { useSelector } from "react-redux";
import { CandyWarsApp } from './CandyWars/CandyWarsApp'

export const Dashboard = () => {
  const state = useSelector((state) => state);
  let [playGame, showGame] = useState(false)
  const { user } = state.auth

  let history = user.play_record.map((record, key) => {
    let playDate = new Date(record.play_date)
    let month = playDate.getMonth() + 1
    let date = playDate.getDate()
    let year = `${playDate.getFullYear()}`
    let twoDigitYear = year[2] + year[3]
    return (
      <div key={key} className='history-card'>
        <p><span>{`${month}-${date}-${twoDigitYear}`}</span></p>
        <p><span>{record.player_initials.toUpperCase()}</span></p>
        <p>score:<span>{record.score}</span></p>
      </div>
    )
  })

  const UserDash = (
    <div className='dash-home'>
    <div className="header">
      <h1>Welcome, {user.name}!</h1>
    </div>
      <div className='play-btn-wrapper'>
        <button onClick={() => showGame(!playGame)}>Play Now</button>
      </div>
      <div className='history-header'>
        <h3>Play History</h3>
      </div>
        <div className='history-cards-container'>
          {history}
        </div>
      
    </div>
  )

  return (
    <Fragment>
      {!playGame ? UserDash : <CandyWarsApp />}
    </Fragment>
  );
};
