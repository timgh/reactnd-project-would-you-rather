import { saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const ADD_ANSWER = 'ADD_ANSWER'

function addAnswer ({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWER,
    authedUser,
    qid,
    answer
  }
}

export function handleAddAnswer (answerData) {
  return (dispatch) => {
    dispatch(showLoading())
    return saveQuestionAnswer(answerData)
      .then(() => dispatch(addAnswer(answerData)))
      .then(() => dispatch(hideLoading()))
  }
}