import React, { Component, Fragment } from 'react'
import '../css/navbar.css'
import brand from '../img/WRTextLogo.jpg'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    const { user, authedUser } = this.props
    return (
      <div className="navContainer">
        <div className="innerContainer">
          <img src={brand} alt="logo" className="nav-brand" />
          {authedUser ? (
            <Fragment>
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to="/home">Home</Link>
                </li>
                <li className="nav-item split">
                  <Link to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item ">
                  <Link to="/add">Create a new poll +</Link>
                </li>
              </ul>
              <ul className="nav-list">
                <li className="nav-item">
                  <div className={"authedUserContainer"}>
                    <div className={"navAuthedUserAvatar"}>
                      <img alt={'avatar'} src={user.avatarURL} />
                    </div>
                    <div>{user ? user.name : null}</div>
                  </div>
                </li>
                <li className="nav-item log-out">
                  <Link to="/">
                    <button className="log-out-button">Log Out</button>
                  </Link>
                </li>
              </ul>
            </Fragment>
          ) : (
            <ul className="nav-list">
              <li className="nav-item">Please login to start to play</li>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { users, authedUser } = state
  const user = users[authedUser]
  return {
    user,
    authedUser
  }
}

export default connect(mapStateToProps)(NavBar)
