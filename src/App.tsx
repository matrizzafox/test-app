import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container } from 'semantic-ui-react';

import { setAuthUser, setUnauthUser } from './store/actions/user';

import Header from "./components/Header"
import { Auth, Profile} from './pages';

import 'semantic-ui-css/semantic.min.css'

function App() {
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if(user.id !== undefined) dispatch(setAuthUser(user.id))
    else dispatch(setUnauthUser())
  }, [dispatch])

  return (
    <>
      <Router>
        <Container>
          <Header />
          <Route path="/" exact />
          <Route path="/login" component={Auth} />
          <Route path="/profile/:id?" component={Profile} />
        </Container>
      </Router>
    </>
  );
}

export default App;
