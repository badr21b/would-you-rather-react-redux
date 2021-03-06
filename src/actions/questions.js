import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA'
import { handleInitialData } from './shared'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

export function handleSaveQuestionAnswer(answerObj) {
  return dispatch => {
    dispatch(showLoading())

    return _saveQuestionAnswer({
      ...answerObj
    })
      .then(() => dispatch(handleInitialData(answerObj.authedUser)))
      .then(() => dispatch(hideLoading()))
  }
}

export function handleSaveQuestion(info) {
  console.log('questionObj: ', info)
  return dispatch => {
    dispatch(showLoading())

    return _saveQuestion({
      ...info,
      author: info.authedUser
    })
      .then(res => dispatch(handleInitialData(res.author)))
      .then(() => console.log('saved with success'))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}
