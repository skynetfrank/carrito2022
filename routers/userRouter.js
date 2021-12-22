import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import User from '../models/userModel.js';
import { generateToken, isAdmin, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          nombre: user.nombre,
          email: user.email,
          apellido: user.apellido,
          telefono: user.telefono,
          cedula: user.cedula,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Email o Clave Invalidos' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      nombre: req.body.nombre,
      email: req.body.email,
      apellido: req.body.apellido,
      cedula: req.body.cedula,
      password: bcrypt.hashSync(req.body.password, 8),
      telefono: req.body.telefono,
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      nombre: createdUser.nombre,
      email: createdUser.email,
      apellido: createdUser.apellido,
      cedula: createdUser.cedula,
      telefono: createdUser.telefono,
      isAdmin: createdUser.isAdmin,
      isSeller: user.isSeller,
      token: generateToken(createdUser),
    });
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'Usuario No Encontrado' });
    }
  })
);

userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.nombre = req.body.nombre || user.nombre;
      user.email = req.body.email || user.email;
      user.apellido = req.body.apellido || user.apellido;
      user.cedula = req.body.cedula || user.cedula;
      user.telefono = req.body.telefono || user.telefono;

      if (user.isSeller) {
        user.seller.codigo = req.body.sellerCodigo || user.seller.codigo;
        user.seller.comision = req.body.sellerComision || user.seller.comision;
        user.seller.acumuladoVentas =
          req.body.sellerAcumuladoVentas || user.seller.acumuladoVentas;
        user.seller.observaciones =
          req.body.sellerObservaciones || user.seller.observaciones;
      }
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        nombre: updatedUser.nombre,
        email: updatedUser.email,
        apellido: updatedUser.apellido,
        cedula: updatedUser.cedula,
        telefono: updatedUser.telefono,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller,
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@me.com') {
        res
          .status(400)
          .send({ message: 'No puedes Eliminar al Admin-Developer!' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.nombre = req.body.nombre || user.nombre;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller);
      user.isAdmin = Boolean(req.body.isAdmin);
      // user.isAdmin = req.body.isAdmin || user.isAdmin;
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'Usuario No Encontrado' });
    }
  })
);

export default userRouter;
