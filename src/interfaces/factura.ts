import { Carrito } from './carrito';

export interface factura{
    _id:string,
    productos:Carrito[],
    totalI:number,
    totalF:number
}