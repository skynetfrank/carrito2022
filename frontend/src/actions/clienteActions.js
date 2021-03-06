import Axios from 'axios';
import {
  CLIENTE_DETAILS_FAIL,
  CLIENTE_DETAILS_REQUEST,
  CLIENTE_DETAILS_SUCCESS,
  CLIENTE_REGISTER_FAIL,
  CLIENTE_REGISTER_REQUEST,
  CLIENTE_REGISTER_SUCCESS,
  CLIENTE_UPDATE_PROFILE_FAIL,
  CLIENTE_UPDATE_PROFILE_REQUEST,
  CLIENTE_UPDATE_PROFILE_SUCCESS,
  CLIENTE_LIST_REQUEST,
  CLIENTE_LIST_SUCCESS,
  CLIENTE_LIST_FAIL,
  CLIENTE_DELETE_REQUEST,
  CLIENTE_DELETE_SUCCESS,
  CLIENTE_DELETE_FAIL,
} from '../constants/clienteConstants';

export const registerCliente =
  (
    nombre,
    email,
    rif,
    direccion,
    telefono,
    descuento,
    prontopago,
    contacto,
    observaciones
  ) =>
  async dispatch => {
    dispatch({
      type: CLIENTE_REGISTER_REQUEST,
      payload: {
        nombre,
        email,
        rif,
        direccion,
        telefono,
        descuento,
        prontopago,
        contacto,
        observaciones,
      },
    });
    try {
      const { data } = await Axios.post('/api/clientes/register', {
        nombre,
        email,
        rif,
        direccion,
        telefono,
        descuento,
        prontopago,
        contacto,
        observaciones,
      });
      dispatch({ type: CLIENTE_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CLIENTE_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const detailsCliente =
  (clienteId) => async (dispatch, getState) => {
    dispatch({ type: CLIENTE_DETAILS_REQUEST, payload: clienteId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.get(`/api/clientes/${(clienteId)}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: CLIENTE_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CLIENTE_DETAILS_FAIL, payload: message });
    }
  };

export const updateClienteProfile = cliente => async (dispatch, getState) => {
 
  dispatch({ type: CLIENTE_UPDATE_PROFILE_REQUEST, payload: cliente });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
     console.log('actions: cliente', cliente);
    const { data } = await Axios.put(`/api/clientes/profile`, cliente, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CLIENTE_UPDATE_PROFILE_SUCCESS, payload: data });
    console.log("payload",data);
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CLIENTE_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const listClientes = () => async (dispatch, getState) => {
  dispatch({ type: CLIENTE_LIST_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/clientes', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: CLIENTE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CLIENTE_LIST_FAIL, payload: message });
  }
};

export const deleteCliente = clienteId => async (dispatch, getState) => {
  dispatch({ type: CLIENTE_DELETE_REQUEST, payload: clienteId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await Axios.delete(`/api/clientes/${clienteId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: CLIENTE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CLIENTE_DELETE_FAIL, payload: message });
  }
};
