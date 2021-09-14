import axios from 'axios';
import { Producto } from '../interfaces/Producto';

const API = 'http://localhost:8080/';

export const getProductos=async () =>{
    return await axios.get(API+'productos');
}

export const CrearProductos=async (producto:Producto) =>{
    return await axios.post(API+'crearProducto',producto);
}

export const EditarProductos=async (producto:Producto) =>{
    return await axios.post(API+'productos',producto);
}