import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/new-question.css'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    redirectHome: false,
    optionOneText: '',
    optionTwoText: ''
  }

  noticeChange = e => {
    const text = e.target.value
    const name = e.target.name

    this.setState(() => ({
      [name]: text
    }))
  }

  createQuestion = e => {
    e.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch, authedUser } = this.props

    dispatch(
      handleSaveQuestion({ optionOneText, optionTwoText, authedUser })
    ).then(() =>
      this.setState(() => ({
        redirectHome: true
      }))
    )
  }

  render() {
    const { redirectHome, optionOneText, optionTwoText } = this.state
    const dontPost = optionOneText === '' ? true : optionTwoText === ''

    if (redirectHome) {
      return <Redirect to={`/home`} />
    }

    return (
      <div>
        <div className="vote-container wyr-form" style={{marginTop:"24px"}}>
          <div className={"newQuestionHeader"}>Would you rather:</div>
          <form onSubmit={this.createQuestion}>
            <div className={"formContainer"}>
              <input
                  style={{
                    "backgroundColor": "rgb(210, 35, 36)",
                    "borderBottom": "1px solid rgb(0, 0, 0)"
                  }}
                placeholder="Answer One"
                onChange={this.noticeChange}
                value={optionOneText}
                name="optionOneText"
              />
              <br />
              <input
                  style={{
                    "backgroundColor": "rgb(55, 137, 175)",
                    "borderTop": "1px solid rgb(0, 0, 0)",
                  }}
                placeholder="Answer Two"
                onChange={this.noticeChange}
                value={optionTwoText}
                name="optionTwoText"
              />

            </div>
            <div className={"askQuestionButtonContainer"}>
              <button type="submit"
                      disabled={dontPost}
                      className={"vote-button"}
              >
                Ask question
              </button>
            </div>

          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(NewQuestion)
