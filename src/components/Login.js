import React, { Component } from 'react'
import { Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'


class Login extends Component {

  state = {
    redirectToReferrer: false
  }

  handleLogin = (userid) => {
    this.props.dispatch(setAuthedUser(userid))
    this.setState(() => ({
      redirectToReferrer: true
    }))
  }

  render() {
    const { redirectToReferrer } = this.state
    const { from } = this.props.location.state || { from: { pathname: '/' } }

    if (redirectToReferrer === true) {
      return <Redirect to={from}/>
    }

    return (
      <div className='container'>
        <p>You must log in to view the page</p>

        <div className="select">
          <select onChange={(event) => this.handleLogin(event.target.value)}>
            <option value='none'>select a user</option>
            {this.props.users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
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
