import React, {useState,useEffect} from 'react';
import Product from '../../components/Product/Product';

import {Producto} from '../../interfaces/Producto';
import * as services from '../../Services/services';

function Home() {

  const [productos, setproductos] = useState<Producto[]>([]);

   const loadProductos= async()=>{
    const res = await services.getProductos();
    setproductos(res.data);
  }

  useEffect(() => {
    loadProductos();
  },[])
    
    return (
        <>
      <section className="container mt-3">
      <div className='text-center row'>
        {productos.map((product,index)=>{
          return <Product key={index} producto={product}/>
        })}
      </div>
      </section>
      </>
    )
}

export default Home
