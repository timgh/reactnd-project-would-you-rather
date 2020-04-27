import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'


class Nav extends Component {

  render() {
    return (
      <nav className='nav'>
        <ul>
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
            <img className='avatar' src={this.props.userAvatar} alt="User avatar"/>
          <li>
            <NavLink to='/logout' activeClassName='active'>
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
    userAvatar: users[authedUser].avatarURL
  }
}

export default connect(mapStateToProps)(Nav) 
