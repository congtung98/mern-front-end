import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isUserLoggedIn, updateCart } from './redux/actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import CheckoutPage from './containers/CheckoutPage';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {

    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }

  }, [auth.authenticate]);

  useEffect(() => {
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage}></Route>
          <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/:productSlug/:productId/p" component={ProductDetailsPage}  />
          <Route path="/:slug" exact component={ProductListPage}  />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
