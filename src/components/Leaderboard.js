import React, { Component } from 'react'
import '../css/leaderboard.css'
import leaderIcon from '../img/cup-icon.png'
import { connect } from 'react-redux'

class LeaderBoard extends Component {
  render() {
    const { users, leaderboardPlacements } = this.props

    console.log(leaderboardPlacements)

    return (
      <div className="loaderBoardContainer">
        <h2>&#9734; &#9734; &#9734; Leaderboard &#9734; &#9734; &#9734;</h2>

        {leaderboardPlacements.sort((a, b) => b.points - a.points).map((user,key) => (
          <div key={user.id} className={"leaderUserContainer"}>
            <div className={"leaderUserInfoHolder"}>
                <div className={"userName"}>{`${users[user.id].name}`}</div>
                <div className={"userTotalScore"}>
                  <div className={"scoreText"}>Score</div>
                  <div className={"scoreValue"}>{user.points}</div>
                </div>
            </div>
            <div className={"leaderUserAvatarHolder"}>
              {key === 0 && (
                  <div className={"leaderCup"}>
                    <img alt={'leaderIcon'} src={leaderIcon}/>
                  </div>
              )}
              <div className="avatar-holder"  style={
                (key === 0) ? {'border':'3px solid #ffc33b'} : {'border':'0px'}
              }>
                <img
                    src={users[user.id].avatarURL}
                    alt={`Avatar of ${users[user.id].avatarURL}`}
                    className={"avatar leaderboard-user "}
                />
             </div>
            </div>
            <div className={"leaderUserPointsHolder"}>
              <p className={"leaderUserPointsText"}>
                Questions answered: {Object.keys(users[user.id].answers).length}
              </p>
              <p className={"leaderUserPointsText"}>
                Questions asked: {users[user.id].questions.length}
              </p>
            </div>


          </div>
        ))}
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  const userIds = Object.keys(users)
  const leaderboardPlacements = userIds.map(id => ({
    id: id,
    points:
      Object.keys(users[id].answers).length +
      Object.keys(users[id].questions).length
  }))

  return {
    leaderboardPlacements,
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard)
