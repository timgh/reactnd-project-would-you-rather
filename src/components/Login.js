import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Login extends Component {

  handleSelect = (userid) => {
    this.props.dispatch(setAuthedUser(userid))
    this.props.history.push('/')
  }

  render() {
    return (
      <div className="select">
        <select onChange={(event) => this.handleSelect(event.target.value)}>
          <option value='none'>select a user</option>
          {this.props.users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        </div>
    )
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
     users: Object.values(users)
  }
}

export default connect(mapStateToProps)(Login)