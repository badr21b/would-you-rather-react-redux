import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../css/question.css'
import '../css/takeVote.css'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Link } from 'react-router-dom'

class TakeVote extends Component {
  handleVote = answerObj => {
    const { dispatch } = this.props
    dispatch(handleSaveQuestionAnswer(answerObj))
  }

  render() {
    const {
      question,
      authedUser,
      wrongQuestion,
      questionAnswer,
      users
    } = this.props

    if (wrongQuestion) {
      return (
        <div className="vote-container"
             style={{"marginTop": "24px","padding":"9px","textAlign":"center"}}
        >
          <h2>404: something went wrong!</h2>
          <p>
            Return to{' '}
            <Link to="/">
              <span className="green">Home Page</span>
            </Link>
          </p>
        </div>
      )
    }

    const optionOneAmount = question.optionOne.votes.length
    const optionTwoAmount = question.optionTwo.votes.length
    const allVotes = optionOneAmount + optionTwoAmount

    const optionOnePercentage = parseInt((optionOneAmount / allVotes) * 100, 10)
    const optionTwoPercentage = parseInt((optionTwoAmount / allVotes) * 100, 10)

    // if the question wasn't answered yet by the authed user
    if (questionAnswer === undefined) {
      return (
        <div>
          <Link to="/home">
            <button className="returnBtn">
              &#60;&nbsp;&nbsp;Return to dashboard
            </button>
          </Link>
          <div className="vote-container">
            <div className="vote-avatar-holder">
              <img
                src={users[question.author].avatarURL}
                alt={`Avatar of ${users[question.author].avatarURL}`}
                className="vote-avatar"
              />
              <h3 className="vote-author">
                {`${users[question.author].name}`} asks:
              </h3>
            </div>
            <br />
            <div>
              <div className={"vote-question-title"}>Would you rather</div>
              <div className={"vote-answers-container"}>
                <div className={"vote-answer-holder"}
                     style={{"backgroundColor":"#3789af", "borderBottom":"1px solid #000"}}
                >
                  <div className={"vote-answer-text"}>
                    A: {question.optionOne.text}
                  </div>
                  <button
                      className="vote-btn"
                      onClick={() =>
                          this.handleVote({
                            authedUser,
                            qid: question.id,
                            answer: 'optionOne'
                          })
                      }
                  >
                    Choose this answer
                  </button>
                </div>

                <div className={"vote-answer-holder"}
                     style={{"backgroundColor":"#d22324", "borderTop":"1px solid #000"}}
                >
                  <div className={"vote-answer-text"}>
                    B: {question.optionTwo.text}
                  </div>
                  <button
                      className="vote-btn"
                      onClick={e =>
                          this.handleVote({
                            answer: 'optionTwo',
                            authedUser,
                            qid: question.id
                          })
                      }
                  >
                    Choose this answer
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <Link to="/home">
            <button className="returnBtn">
              &#60;&nbsp;&nbsp;Return to dashboard
            </button>
          </Link>
          <div className="vote-container">
            <div className="vote-avatar-holder">
              <img
                src={users[question.author].avatarURL}
                alt={`Avatar of ${users[question.author].avatarURL}`}
                className="vote-avatar"
              />
              <h3 className="vote-author">
                {`${users[question.author].name}`} asks:
              </h3>
            </div>
            <br />
            <div className={""} >
              <div className={"vote-question-title"}>Would you rather</div>
              <div className="optionResultHolder">
                <div
                  className={
                    users[authedUser].answers[question.id] === 'optionOne'
                        ? 'yourAnswerContainer answerContainer'
                        : 'answerContainer'
                  }
                >
                  <div className={"answerOptionHolder"}>
                    A: {question.optionOne.text}{' '}
                  </div>
                  {(users[authedUser].answers[question.id] === 'optionOne')&&(
                      <div className={"yourVoteTextHolder"}>
                        Your vote!
                      </div>
                  )}
                </div>
              </div>
              <div className="optionResultHolder">
                <div
                  className={
                    users[authedUser].answers[question.id] === 'optionTwo'
                      ? 'yourAnswerContainer answerContainer'
                      : 'answerContainer'
                  }
                >
                  <div className={"answerOptionHolder"}>
                    B: {question.optionTwo.text}{' '}
                  </div>

                  {(users[authedUser].answers[question.id] === 'optionTwo')&&(
                      <div className={"yourVoteTextHolder"}>
                        Your vote!
                      </div>
                  )}

                </div>
              </div>
              <div className={"otherUsersAnswersHolder"}>
                <h4>What other users voted:</h4>
                <p>
                  A: {question.optionOne.text} | {optionOneAmount} votes (
                  {optionOnePercentage}
                  %)
                </p>
                <p>
                  B: {question.optionTwo.text} | {optionTwoAmount} votes (
                  {optionTwoPercentage}
                  %)
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const thisQuestionId = props.match.params.question_id
  const question = questions[thisQuestionId]
  const wrongQuestion = !questions[thisQuestionId]
  const questionAnswer = users[authedUser].answers[thisQuestionId]
  return {
    questions,
    question,
    wrongQuestion,
    questionAnswer,
    users,
    authedUser,
    thisQuestionId
  }
}

export default connect(mapStateToProps)(TakeVote)
