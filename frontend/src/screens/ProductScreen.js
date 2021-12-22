import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const [disponible, setDisponible] = useState(0);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div className="screen-offset">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">Ha ocurrido un error: {error}</MessageBox>
      ) : (
        <div className="screen-offset">
          <div className="row">
            <div className="col-2">
              <img
                className="large"
                src={product.imagen}
                alt={product.nombre}
              />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.nombre}</h1>
                </li>
                <li>
                  <h2>Precio ${(product.precio).toFixed(2)}</h2>
                </li>
                <li>
                  {product.descripcion}
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card resumen">
                <div className="row center">
                  <h1>Resumen</h1>
                </div>

                <ul>
                  <li>
                    <div className="row">
                      <div>Precio:</div>
                      <div className="price">${(product.precio).toFixed(2)}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status:</div>
                      <div>
                        {product.inventario > 0 ? (
                          <span className="success">Disponible</span>
                        ) : (
                          <span className="danger">No Disponible</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.inventario > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Cantidad:</div>
                          <div>
                            <select
                              id="select-cant"
                              value={qty}
                              onChange={e => setQty(e.target.value)}
                            >
                              {[...Array(product.inventario).keys()].map(x => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </li>

                      <li>
                        <button
                          className="primary block"
                          onClick={addToCartHandler}
                          disabled={product.inventario === 0}
                        >
                          Agregar al Carrito
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductScreen;
