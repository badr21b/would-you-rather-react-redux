import React, { Component } from 'react'
import '../css/user.css'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser.js'
import { Redirect } from 'react-router-dom'
import { fakeAuth } from '../utils/api'

class User extends Component {
  state = {
    redirectToReferrer: false
  }

  handleLogin = id => {
    const { dispatch } = this.props

    fakeAuth.authenticate(() => {
      dispatch(setAuthedUser(id))
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: '/home' }
    }
    const { redirectToReferrer } = this.state
    const { user, users } = this.props

    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
        <div className="userContainer" key={user.id}  onClick={() => this.handleLogin(user.id)}>
            <div className="avatarHolder" >
              <img
                  src={users[user.id].avatarURL}
                  alt={`Avatar of ${users[user.id].avatarURL}`}
                  className=""
              />
            </div>
            <div className="authorName">{`${users[user.id].name}`}</div>
        </div>
    )
  }
}

function mapStateToProps({ authedUser, users }, { id }) {
  const user = users[id]
  return {
    user,
    users
  }
}

export default connect(mapStateToProps)(User)
