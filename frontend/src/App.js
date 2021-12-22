import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import logo from './logo-carrito50X50.png';
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import ClienteRegisterScreen from './screens/ClienteRegisterScreen';
import ClienteListScreen from './screens/ClienteListScreen';
import ClienteEditScreen from './screens/ClienteEditScreen';
import Contacto from './Contacto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCartArrowDown, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

function App() {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div className="row">
            <Link to="/">
              <img className="logo" src={logo} alt="logo" />
            </Link>
            <Link className="brand" to="/">
              Amazonia
            </Link>
          </div>
          <div>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.nombre.substr(0, 15)}
                  <FontAwesomeIcon icon={faCaretDown} />
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">Mi Perfil</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Mis Pedidos</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Cerrar Sesion
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <Link to="/administrador">
                <FontAwesomeIcon icon={faUserShield} />
              </Link>
            )}
            <Link to="/cart">
              <FontAwesomeIcon icon={faCartArrowDown} />
              {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
            </Link>
            <Link to="/Contacto">
              <FontAwesomeIcon icon={faEnvelope}/>
            </Link>
          </div>
        </header>
        <main>
          <Route path="/administrador" component={AdminScreen}></Route>
          <Route path="/contacto" component={Contacto}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <PrivateRoute path="/profile" component={ProfileScreen}></PrivateRoute>
          <Route path="/register" component={RegisterScreen}></Route>
          <AdminRoute path="/productlist" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/clientelist" component={ClienteListScreen} exact></AdminRoute>
          <AdminRoute path="/registrarcliente" component={ClienteRegisterScreen} exact></AdminRoute>
          <AdminRoute path="/productlist/pageNumber/:pageNumber" component={ProductListScreen} exact></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen} exact></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <AdminRoute path="/cliente/:id/edit" component={ClienteEditScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/pageNumber/:pageNumber" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          carrito<i className="far fa-copyright"></i>2022
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
