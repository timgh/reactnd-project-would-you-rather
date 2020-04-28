import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/answers'
import { calculatePercentage } from '../utils/helpers'

class Poll extends Component {

  handleAnswer = (answer) => {
    const { question, authedUser } = this.props
    this.props.dispatch(handleAddAnswer({
      authedUser,
      answer,
      qid: question.id,
    }))
  }

  render() {
    if (this.props.question === null) {
      return <p>This poll does not exist (404)</p>
    }
    const { question, authedUser, authorAvatar } = this.props

    const userVotedOne = question.optionOne.votes.includes(authedUser)
    const userVotedTwo = question.optionTwo.votes.includes(authedUser)
    const answered = userVotedOne || userVotedTwo

    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = calculatePercentage(optionOneVotes, totalVotes)
    const optionTwoPercentage = calculatePercentage(optionTwoVotes, totalVotes)

    if (answered) {
      return (
        <div className='poll-container'>
          <img className='avatar' src={authorAvatar} alt="Author's avatar"/>
          <h3>{question.author} asked</h3>
          <h2>Would You rather....?</h2>
          <h3>{question.optionOne.text} {userVotedOne ? '(your answer)' : null}</h3>
          <span>{optionOneVotes} of {totalVotes} votes ({optionOnePercentage} %)</span>
          <h3>{question.optionTwo.text} {userVotedTwo ? '(your answer)' : null}</h3>
          <span>{optionTwoVotes} of {totalVotes} votes ({optionTwoPercentage} %)</span>
        </div>
      )
    } else {
      return (
        <div className='poll-container'>
          <img className='avatar' src={authorAvatar} alt="Author's avatar"/>
          <h3>{question.author} asks</h3>
          <h2>Would You rather....?</h2>
          <h3>
            <button className='btn' onClick={() => {this.handleAnswer('optionOne')}}>{question.optionOne.text}</button>
          </h3>
          <span>or</span>
          <h3>
            <button className='btn' onClick={() => {this.handleAnswer('optionTwo')}}>{question.optionTwo.text}</button>
          </h3>
        </div>
      )
    }
  }
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
  const { id } = match.params
  const question = questions[id]
  if (!question) {
    return {
      question: null
    }
  }

  return {
    question,
    authedUser,
    authorAvatar: users[question.author].avatarURL
  }
}

export default connect(mapStateToProps)(Poll)