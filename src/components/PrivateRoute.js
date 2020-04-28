import React from 'react'
import { Route, Redirect} from 'react-router-dom'

/*
  The handling of protected routes is based on this article
  https://tylermcginnis.com/react-router-protected-routes-authentication/
*/

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
    isAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
) 

export default PrivateRoute 


