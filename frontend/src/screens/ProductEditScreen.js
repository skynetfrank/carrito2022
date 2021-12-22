import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

export default function ProductEditScreen(props) {
  const productId = props.match.params.id;
  const [costo, setCosto] = useState(0);
  const [preciomayor, setPreciomayor] = useState(0);
  const [precioespecial, setPrecioespecial] = useState(0);
  const [preciodocena, setPreciodocena] = useState(0);
  const [proveedor, setProveedor] = useState('612b9334d5059ea31d3284bf');
  const [tags, setTags] = useState([]);
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);
  const [imagen, setImagen] = useState('');
  const [cloudImage, setCloudImage] = useState('');
  const [categoria, setCategoria] = useState('');
  const [inventario, setInventario] = useState(0);
  const [marca, setMarca] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push('/productlist');
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setNombre(product.nombre);
      setPrecio(product.precio);
      setImagen(product.imagen);
      setCloudImage(product.cloudImage);
      setCategoria(product.categoria);
      setInventario(product.inventario);
      setMarca(product.marca);
      setDescripcion(product.descripcion);
      setCosto(product.costo);
      setPreciomayor(product.precioMayor);
      setPrecioespecial(product.precioEspecial);
      setPreciodocena(product.preciodocena);
      setProveedor(product.proveedor);
      setTags(product.tags);
    }
  }, [product, dispatch, productId, successUpdate, props.history]);

  const submitHandler = e => {
    e.preventDefault();

    dispatch(
      updateProduct({
        _id: productId,
        nombre,
        precio,
        imagen,
        cloudImage,
        categoria,
        marca,
        inventario,
        descripcion,
        costo,
        preciomayor,
        precioespecial,
        preciodocena,
        proveedor,
        tags,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log('data upload recibida:', data);
      setImagen(data.url);
     
      setCloudImage(data.cloudinaryUrl);
      setLoadingUpload(false);
       console.log('cloudImage', cloudImage);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="div-producto">
        <form
          className="form producto"
          id="form-producto"
          onSubmit={submitHandler}
        >
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <React.Fragment key={99}>
              <div>
                <label htmlFor="name">Nombre</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter name"
                  value={nombre}
                  maxLength="16"
                  onChange={e => setNombre(e.target.value)}
                ></input>
              </div>

              <div>
                <label htmlFor="price">Precio</label>
                <input
                  id="price"
                  type="text"
                  placeholder="Enter price"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                ></input>
              </div>
              <div className="hide">
                <label htmlFor="inventario">Inventario</label>
                <input
                  id="inventario"
                  type="text"
                  placeholder="numero de unidades en Stock"
                  value={inventario}
                  onChange={e => setInventario(e.target.value)}
                ></input>
              </div>

              <div className="hide">
                <label htmlFor="image">Imagen</label>
                <input
                  id="image"
                  type="text"
                  value={imagen}
                  onChange={e => setImagen(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="cloudImage">Cloudinary</label>
                <input
                  id="cloudImage"
                  type="text"
                  value={cloudImage}
                  onChange={e => setCloudImage(e.target.value)}
                ></input>
              </div>

              <div>
                <label htmlFor="imageFile">Imagen</label>
                <input
                  type="file"
                  id="imageFile"
                  label="Choose Image"
                  onChange={uploadFileHandler}
                ></input>
                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (
                  <MessageBox variant="danger">{errorUpload}</MessageBox>
                )}
              </div>
              <div id="div-tiny-image">
                <img src={imagen} className="tiny-image" alt="imagen" />
                <p>
                  Imagen actual asignada selecciona un archivo con el boton de
                  arriba para cambiar la imagen.
                </p>
              </div>

              <div>
                <label htmlFor="category">Categoria</label>
                <input
                  id="category"
                  type="text"
                  placeholder="Ingrese una categoria"
                  value={categoria}
                  onChange={e => setCategoria(e.target.value)}
                ></input>
              </div>
                           <div>
                <label htmlFor="brand">Marca</label>
                <input
                  id="brand"
                  type="text"
                  placeholder="Ingrese una Marca de producto"
                  value={marca}
                  onChange={e => setMarca(e.target.value)}
                ></input>
              </div>

              <div>
                <label htmlFor="description">Descripcion</label>
                <textarea
                  id="description"
                  rows="2"
                  type="text"
                  placeholder="escriba una pequeña descripcion del producto"
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                ></textarea>
              </div>
              <div>
                <label htmlFor="costo">Costo</label>
                <input
                  id="costo"
                  type="number"
                  value={costo}
                  onChange={e => setCosto(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="preciomayor">Precio al Mayor</label>
                <input
                  id="preciomayor"
                  type="number"
                  value={preciomayor}
                  onChange={e => setPreciomayor(e.target.value)}
                ></input>
              </div>

              <div className="hide">
                <label htmlFor="precioespecial">Precio Especial</label>
                <input
                  id="precioespecial"
                  type="number"
                  value={precioespecial}
                  onChange={e => setPrecioespecial(e.target.value)}
                ></input>
              </div>
              <div className="hide">
                <label htmlFor="preciodocena">Precio por Docena</label>
                <input
                  id="preciodocena"
                  type="number"
                  value={preciodocena}
                  onChange={e => setPreciodocena(e.target.value)}
                ></input>
              </div>

              <div className="hide">
                <label htmlFor="proveedor">Proveedor</label>
                <input
                  id="proveedor"
                  type="text"
                  value={proveedor}
                  onChange={e => setProveedor(e.target.value)}
                ></input>
              </div>
              <div>
                <label htmlFor="tags">Etiquetas</label>
                <input
                  id="tags"
                  type="text"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                ></input>
              </div>

              <div>
                <button className="primary block" type="submit">
                  Guardar Producto
                </button>
              </div>
            </React.Fragment>
          )}
        </form>
      </div>
    </div>
  );
}
