import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import './style.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { 
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI';
import { useDispatch, useSelector } from 'react-redux';
import { checkLoginModal, getCartItems, login, searchProduct, signout, signup as _signup } from '../../redux/actions';
import Cart from '../UI/Cart';

/**
* @author
* @function Header
**/

const Header = (props) => {

  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  console.log(props, 'PROPS');

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if(
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ){
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if(signup){
      userSignup();
    }else{
      dispatch(login({ email, password }));
      setEmail('');
      setPassword('');
    }
  }

  const logout = () => {
    dispatch(signout());
  }

  useEffect(() => {
    if(auth.authenticate){
        dispatch(checkLoginModal(false));
    }
  }, [auth.authenticate]);

  useEffect(() => {
    setError(auth.error)
    if(auth.error && !auth.authenticating){
      setTimeout(() => {
        setError('');
      }, 3000)
    }
  }, [auth.error, auth.authenticating])

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const renderLoggedInMenu = () => {
      return (
        <DropdownMenu
            menu={
            <a className="fullName">
                {auth.user.fullName}
            </a>
            }
            menus={[
            { label: 'My Profile', href: '', icon: null },
            { label: 'SuperCoin Zone', href: '', icon: null },
            { label: 'Flipkart Plus Zone', href: '', icon: null },
            { 
                label: 'Orders', 
                href: `/account/orders`, 
                icon: null 
            },
            { label: 'Wishlist', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'My Chats', href: '', icon: null },
            { label: 'Coupons', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'Notifications', href: '', icon: null },
            { label: 'Gift Cards', href: '', icon: null },
            { label: 'Logout', href: '', icon: null, onClick: logout },
            ]}
        />
      );
  }

  const renderNonLoggedInMenu = () => {
      return (
        <DropdownMenu
            menu={
            <a 
              className="loginButton" 
              onClick={() => {
                setSignup(false);
                dispatch(checkLoginModal(true));
              }
            }>
                Login
            </a>
            }
            menus={[
            { label: 'My Profile', href: '', icon: null },
            { label: 'Flipkart Plus Zone', href: '', icon: null },
            { 
                label: 'Orders', 
                href: `/account/orders`, 
                icon: null, 
                onClick: () => {
                    !auth.authenticate && dispatch(checkLoginModal(true));
                } 
            },
            { label: 'Wishlist', href: '', icon: null },
            { label: 'Rewards', href: '', icon: null },
            { label: 'Gift Cards', href: '', icon: null },
            ]}
            firstMenu={
            <div className="firstmenu">
                <span>New Customer?</span>
                <a
                  onClick={() => {
                    dispatch(checkLoginModal(true));
                    setSignup(true);
                  }} 
                  style={{ color: '#2874f0' }}
                >
                  Sign Up
                </a>
            </div>
            }
        />
      );
  }
  
  const handleSearch = (e) => {
    const payload = { search: search };
    if(e.key === 'Enter'){
      console.log('Do search function!', search);
      history.push('/searchProducts')
      dispatch(searchProduct(payload));
    }
  }

  return (
    <div className="header">
      <Modal 
        visible={auth.loginModal}
        onClose={() => {
          dispatch(checkLoginModal(false))
        }}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">  
                <div className="loginInputContianer">
                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  )
                  }
                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  )
                  }
                    <MaterialInput 
                    type="text"
                    label="Enter Email/Enter Mobile Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    <MaterialInput 
                    type="password"
                    label="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    //   rightElement={<a href="#">Forgot?</a>}
                    />

                    <p style={{ color: "red", fontWeight: 500, fontSize: 12 }}> {error} </p>
                    <MaterialButton 
                    title={signup ? "Register" : "Login"}
                    bgColor="#fb641b"
                    textColor="#ffffff"
                    style={{
                        margin: '40px 0 20px 0'
                    }}
                    onClick={userLogin}
                    />

                    <p style={{ textAlign: 'center' }}>OR</p>

                    <MaterialButton 
                    title="Request OTP"
                    bgColor="#ffffff"
                    textColor="#2874f0"
                    style={{
                        margin: '20px 0'
                    }}
                    />
                </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText" style={{ color: '#fff'}}>Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        {/* right side menu */}
        <div className="rightMenu">
          {
              auth.authenticate ?
              renderLoggedInMenu() : renderNonLoggedInMenu()
          }
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a href={`/cart`} className="cart">
              <Cart count={Object.keys(cart.cartItems).length} />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Header