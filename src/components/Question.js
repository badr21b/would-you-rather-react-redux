import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/question.css'
import { formatDate } from '../utils/_DATA'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question, user, question_id } = this.props

    return (
      <div className="question">
        <div className="question-title">
            <div className={"questionTitleAvatarHolder"}>
                <img src={user.avatarURL} alt="avatar!" className="avatar" />
            </div>
            <div className={"userTitleInfoContainer"}>
                <div className={"userTitleUserName"}>{user.name}</div>
                <div className={"userTitleTimestamp"}>{formatDate(question.timestamp)}</div>
            </div>
        </div>
        <div className="question-body">
          <h5>Would you rather:</h5>
            <div className={"questionAnswersHolder"}>
                <div className={"questionAnswer"}
                     style={{"backgroundColor":"#d22324", "borderBottom":"1px solid #000"}}
                >
                    A: {question.optionOne.text}
                </div>
                <div className={"questionAnswer"}
                     style={{"backgroundColor":"#3789af", "borderTop":"1px solid #000"}}
                >
                    B: {question.optionTwo.text}
                </div>
            </div>

        </div>
        <div className="question-footer">
          <Link to={`/question/${question_id}`}>
            <button className="vote-button">TAKE A VOTE</button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ questions, users }, { id }) {
  const question = questions[id]
  const question_id = question.id
  const user = users[question.author]

  return {
    question,
    question_id,
    user
  }
}

export default connect(mapStateToProps)(Question)
