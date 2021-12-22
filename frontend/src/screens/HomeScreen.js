import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;
  const [busqueda, setBusqueda] = useState('');
  const { pageNumber = 1 } = useParams();

  useEffect(() => {
    if (busqueda === '') {
      dispatch(listProducts({ pageNumber: pageNumber }));
    }
  }, [busqueda, dispatch, pageNumber]);

  const busquedaHandler = e => {
    dispatch(listProducts({ nombre: busqueda }));
  };

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">Ha ocurrido un error: {error}</MessageBox>
      ) : (
        <>
          <div className="search-div">
            <h1>Nuestros Productos</h1>
            <input
              type="text"
              value={busqueda}
              className="search-input"
              placeholder="buscar..."
              onChange={e => setBusqueda(e.target.value)}
            ></input>
            <FontAwesomeIcon icon={faSearch} onClick={busquedaHandler} />
          </div>
          {products.length === 0 && <MessageBox>Producto No Encontrado!</MessageBox>}
          <div className="row center gapper">
            {products.map(product => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          <div className="row center pagination">
            {[...Array(pages).keys()].map(x => (
              <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={`/pageNumber/${x + 1}`}>
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default HomeScreen;
