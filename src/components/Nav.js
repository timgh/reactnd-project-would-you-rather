import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'


class Nav extends Component {

  handleLogout = () => {
    this.props.dispatch(setAuthedUser(null))
    this.props.history.push('/login')
  }

  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <img className='avatar-menu' src={this.props.userAvatar} alt="User avatar" />
          </li>
          <li>
            {this.props.userName}
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
          <li>
            <NavLink to='/login' activeClassName='active'>
              Logout
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
    userAvatar: users[authedUser].avatarURL,
    userName: users[authedUser].name
  }
}

export default connect(mapStateToProps)(Nav)
//export default Nav
