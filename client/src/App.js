import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Courses from './components/Courses/Courses'
import Login from "./components/Login/Login"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"
import { AuthProvider } from './contexts/AuthContext'
import { CookiesProvider } from 'react-cookie'
import Profile from './components/Profile/Profile'

function App() {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path='/login' exact component={Login} />
            <PrivateRoute path='/profile' exact component={Profile} />
            <PrivateRoute path='/courses' exact component={Courses} />
            <Route path='/'>
              <Redirect to='/profile'/>
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </CookiesProvider>
  )
}

export default App;
