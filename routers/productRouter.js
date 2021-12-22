import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Producto from '../models/productModel.js';
import User from '../models/userModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const pageSize = 9;
    const page = Number(req.query.pageNumber) || 1;
    const nombre = req.query.nombre || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const nameFilter = nombre
      ? { nombre: { $regex: nombre, $options: 'i' } }
      : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const count = await Producto.countDocuments({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
    });
    const products = await Producto.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
    })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Producto.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    //await Producto.remove({});
    const createdProducts = await Producto.insertMany(data.productos);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Producto.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Producto No encontrado' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Producto({
      name: 'ID-' + Date.now(),
      seller: req.user._id,
      image: '/images/nuevo.jpg',
      cloudImage: ' ',
      price: 0,
      category: 'N/A',
      brand: 'N/A',
      countInStock: 0,
      sizesInStock: [],
      rating: 0,
      numReviews: 0,
      description: 'sample description',
      sku: 'N/A',
      lote: 'N/A',
      modelo: 'N/A',
      subcategory: 'N/A',
      costo: 0,
      preciomayor: 0,
      preciodescuento: 0,
      precioespecial: 0,
      preciodocena: 0,
      genero: 'N/A',
      tipo: 'N/A',
      importado: 'SI',
      proveedor: '60f6db4f143c7d2bf856444a',
      pais: 'N/A',
      tags: 'N/A',
    });
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct });
  })
);

productRouter.put(
  '/:id',
  isAuth,
  isSellerOrAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Producto.findById(productId);
    if (product) {
      product.nombre = req.body.nombre;
      product.precio = req.body.precio;
      product.imagen = req.body.imagen;
      product.cloudImage = req.body.cloudImage;
      product.categoria = req.body.categoria;
      product.marca = req.body.marca;
      product.inventario = req.body.inventario;
      product.descripcion = req.body.descripcion;
      product.costo = req.body.costo;
      product.preciomayor = req.body.preciomayor;
      product.preciodescuento = req.body.preciodescuento;
      product.precioespecial = req.body.precioespecial;
      product.preciodocena = req.body.preciodocena;
      product.proveedor = req.body.proveedor;
      product.tags = req.body.tags;
      console.log('coudUrl', req.body.cloudUrl);
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Producto.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
