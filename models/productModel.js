import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, unique: true, maxLength: 18 },
    imagen: { type: String, required: true },
    cloudImage: { type: String, required: false },
    marca: { type: String, required: true },
    modelo: { type: String },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    costo: { type: Number },
    precio: { type: Number, required: true },
    precioMayor: { type: Number, required: false },
    precioDescuento: { type: Number, required: false },
    precioEspecial: { type: Number, required: false },
    precioDocena: { type: Number, required: false },
    proveedor: { type: mongoose.Schema.Types.ObjectID, ref: 'Proveedor' },
    tags: [],
    inventario: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Producto = mongoose.model('Producto', productoSchema);

export default Producto;
