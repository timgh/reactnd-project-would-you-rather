import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading'
import Leaderboard from './Leaderboard'
import AddPoll from './AddPoll'
import Poll from './Poll'
import Nav from './Nav'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ErrorPage from './ErrorPage'
import { ANONYMOUS_ID } from '../actions/shared'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  isAuthenticated = () => {
    return this.props.authedUser !== ANONYMOUS_ID
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
                <Switch>
                  <Route path='/login' exact component={Login} />
                  <PrivateRoute path='/' exact component={Dashboard} isAuthenticated={this.isAuthenticated} />
                  <PrivateRoute path='/leaderboard' exact component={Leaderboard} isAuthenticated={this.isAuthenticated} />
                  <PrivateRoute path='/questions/:id' exact component={Poll} isAuthenticated={this.isAuthenticated} />
                  <PrivateRoute path='/add' exact component={AddPoll} isAuthenticated={this.isAuthenticated} />
                  <Route component={ErrorPage} />
                </Switch>
              </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
