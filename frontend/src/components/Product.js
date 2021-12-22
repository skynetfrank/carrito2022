function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.imagen} alt={product.nombre} />
      </a>
      <div className="card-info">
        <a href={`/product/${product._id}`}>
          {product.nombre}
        </a>
        ${(product.precio).toFixed(2)}
      </div>
    </div>
  );
}

export default Product;
