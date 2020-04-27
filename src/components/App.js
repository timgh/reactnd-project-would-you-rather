import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import AddPoll from './AddPoll'
import Poll from './Poll'
import Nav from './Nav'
import Login from './Login'


import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar/>
          <div className='container'>
            
            {this.props.loading === true
              ? null
              : <div>
                <Nav />
                <Route path='/login' exact component={Login}/>
                <Route path='/' exact component={Dashboard}/>
                <Route path='/leaderboard' exact component={Leaderboard}/>
                <Route path='/questions/:id' exact component={Poll}/>
                <Route path='/add' exact component={AddPoll}/>
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)