import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isUserLoggedIn } from './redux/actions';
import ProductDetailsPage from './containers/ProductDetailsPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {

    if(auth.authenticate){
      dispatch(isUserLoggedIn());
    }

  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/:slug" exact component={ProductListPage}  />
          <Route path="/:productSlug/:productId/p" exact component={ProductDetailsPage}  />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
