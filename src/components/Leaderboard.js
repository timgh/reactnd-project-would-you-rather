import React from 'react'
import { connect } from 'react-redux'

function Leaderboard ({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li className='user' key={user.id}>
          <img className='avatar' src={user.avatarURL} alt={`Avatar for ${user.name}`} />
          <div>
            <h1>{user.name}</h1>
            <p>{user.questions} Questions asked</p>
            <p>{user.answers} Answers given</p>
            <p>Total score of {user.answers+user.questions}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

function mapStateProps ({ users }) {
  return {
    users: Object.keys(users)
      .map((id) => {
        const { name, avatarURL, questions, answers } = users[id]
        return {
          id,
          name,
          avatarURL,
          questions: questions.length,
          answers: Object.keys(answers).length
        }
      })
      .sort((a,b,) => b.questions + b.answers > a.questions + a.answers)
  }
}

export default connect(mapStateProps)(Leaderboard)