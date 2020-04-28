import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { ANONYMOUS_ID } from '../actions/shared'

class Nav extends Component {

  render() {

    const AuthButton = withRouter(({ history }) => (
      this.props.authedUser !== ANONYMOUS_ID
        ? <button className='btn-logout' onClick={() => {
              this.props.dispatch(setAuthedUser(ANONYMOUS_ID))
              history.push('/login')
            }}>
            Logout
          </button>
        : null
    ))

    return (
      <nav className='nav'>
        <ul>
          {this.props.authedUser !== ANONYMOUS_ID ? (
            <li>
              <img className='avatar-menu' src={this.props.userAvatar} alt="User avatar" />
            </li>
          ) : null}
          <li>
            <div className='username'>
              {this.props.userName}
             </div> 
          </li>
          <li>
            <AuthButton/>
          </li>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active'>
              New Poll
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leaderboard
            </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
}


function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    userAvatar: authedUser !== ANONYMOUS_ID ? users[authedUser].avatarURL : "",
    userName:   authedUser !== ANONYMOUS_ID ? users[authedUser].name : "Not logged in"
  }
}

export default connect(mapStateToProps)(Nav)
