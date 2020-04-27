import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  state = {
    showAnswered: false
  }
  showUnaswered = () => {
    this.setState(() => ({
      showAnswered: false
    }))
  }
  showAnswered = () => {
    this.setState(() => ({
      showAnswered: true
    }))
  }
  render() {
    const { showAnswered } = this.state
    const { answered, unanswered } = this.props
    const list = showAnswered === true? answered : unanswered
    return (
      <div>
        <div className='dashboard-switch'>
          <button
            style={{textDecoration: showAnswered === false ? 'underline' : null}}
            onClick={this.showUnaswered}>
              Unanswered
          </button>
          <span>|</span>
          <button
            style={{textDecoration: showAnswered === true ? 'underline' : null}}
            onClick={this.showAnswered}>
              Answered
          </button>
        </div>

        <ul className='dashboard-list'>
          {list.map((question) => (
            <li key={question.id}>
              <Link to={`questions/${question.id}`}>
                {question.optionOne.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}


function mapStateToProps ({ authedUser, questions, users }) {
  //console.log("mapStateToProps", questions)
  const answers = Object.keys(users[authedUser].answers)
  //const answers = users[authedUser].answers
  const answered = answers.map((id) => questions[id])
    .sort((a,b) => b.timestamp - a.timestamp) 
  
  const unanswered = Object.keys(questions)
    .filter((id) => !answers.includes(id))
    .map((id) => questions[id])
    .sort((a,b) => b.timestamp - a.timestamp)
  
  //console.log('answers :', answers)
  //console.log("answered", answered)
  //console.log("unanswered", unanswered)
  return {
    answered,
    unanswered
  }
}

export default connect(mapStateToProps)(Dashboard)