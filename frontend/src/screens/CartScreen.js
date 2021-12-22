import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';

export default function CartScreen(props) {
  //const myurl = queryString.parse(props.location.search);
  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
  const cart = useSelector(state => state.cart);
  
  const { cartItems, error } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    //props.history.push('/cart');
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    <div className="row top">
      <div className="col-2 cart">
        <h1>Tu Carrito</h1>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Tu Carrito esta vacio. <Link to="/">ir a Productos</Link>
          </MessageBox>
        ) : (
          <ul className="carrito-ul">
            {cartItems.map((item, index) => (
              <li key={item.producto + index}>
                <div className="row shadow">
                  <div>
                    <img src={item.imagen} alt={item.nombre} className="small"></img>
                  </div>

                  <div className="min-30">
                    <Link to={`/product/${item.producto}`}>{item.nombre}</Link>
                  </div>

                  <div>
                    <select value={item.qty} onChange={e => dispatch(addToCart(item.producto, Number(e.target.value)))}>
                      {[...Array(item.inventario).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.precio}</div>
                  <div>
                    <FontAwesomeIcon icon={faTrashAlt} onClick={() => removeFromCartHandler(item.producto)} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card resumen">
          <div className="row center">
            <h1>Resumen</h1>
          </div>
          <ul>
            <li className="row">
              <h2 className="cart-subtotal">Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} articulos):</h2>
              <h2>${cartItems.reduce((a, c) => a + c.precio * c.qty, 0).toFixed(2)}</h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Comprar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
