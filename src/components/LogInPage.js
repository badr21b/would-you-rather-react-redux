import React, { Component } from 'react'
import '../css/login.css'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import User from './User'

class LogInPage extends Component {
  componentDidMount() {
    this.props.dispatch(setAuthedUser(false))
  }

  render() {
    const { userIds, location } = this.props
    return (
      <div className="loginContainer">
        <h2>Who are you?</h2>
        <div className={"userListContainer"}>
          {userIds.map(id => (
              <User key={id} id={id} location={location} />
          ))}
        </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const users = state.users
  return {
    userIds: Object.keys(users),
    users
  }
}

export default connect(mapStateToProps)(LogInPage)
