import { RECEIVE_USERS } from '../actions/users'
import { ADD_QUESTION } from '../actions/questions'
import { ADD_ANSWER } from '../actions/answers'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users,
      }
    case ADD_QUESTION :
      const question = action.question
      const { author, id } = question

      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      }
    case ADD_ANSWER :
      const user = state[action.authedUser]
      //debugger
      return {
        ...state,
        [action.authedUser]: {
          ...user,
          answers: {
            ...user.answers,
            [action.qid]: action.answer
          }
        }
      }
    default :
      return state
  }
}
