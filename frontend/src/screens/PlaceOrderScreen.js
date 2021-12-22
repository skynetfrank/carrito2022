import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PlaceOrderScreen(props) {
  const cart = useSelector(state => state.cart);
  if (!cart.paymentMethod) {
    props.history.push('/payment');
  }

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const orderCreate = useSelector(state => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = num => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.precio, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, props.history, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <div className="div-info-user">
            <p>
              <strong>Nombre:</strong> {cart.shippingAddress.fullName}.
              {userInfo.telefono} <br />
              <strong>Direccion: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
          </div>
          <ul>
            <li>
              <h2>Articulos a Comprar</h2>
              <div>
                <ul>
                  {cart.cartItems.map(item => (
                    <li key={item.producto}>
                      <div className="row shadow">
                        <div>
                          <img
                            src={item.imagen}
                            alt={item.nombre}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.producto}`}>
                            {item.nombre}
                          </Link>
                        </div>

                        <div className="qty-price">
                          <p>
                            {' '}
                            {item.qty} x ${item.precio} = $
                            {item.qty * item.precio}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col1-place-order">
          <div className="card resumen">
            <ul>
              <li>
                <div className="row center">
                  <h1>Resumen</h1>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Confirmar Pedido
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
