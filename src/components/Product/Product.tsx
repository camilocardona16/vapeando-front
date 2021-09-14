import React, { useState,useContext } from 'react'
import './Product.css'
import swal from 'sweetalert';
import {Modal,Button,Container,Row,Col} from 'react-bootstrap';
import {Producto} from '../../interfaces/Producto';
import { Carrito } from '../../interfaces/carrito';

interface Props{
  producto:Producto;
}


const Product = ({producto}:Props)=> {

  const [cantidad,setCantidad]= useState(1);
  let[showDetalle,setshowDetalle]=useState(false);
  let[items,setItems]=useState<Carrito[]>([]);

  function addCart(){
    let prodsString = localStorage.getItem('carrito_vapeando');
    if(prodsString){
      let prods=JSON.parse(prodsString);
      let esta=false;
      for (let i = 0; i < prods.length; i++) {
        if(prods[i]._id==producto._id){
          swal({title: "ya esta en el carrito",icon: "info",})
          esta=true;
          break;
        }
      }
      if(esta==false){
        prods.push({
          _id:producto._id,
          img:producto.img,
          nombre:producto.nombre,
          precio:producto.precio,
          cantidad:cantidad,
          subtotal:producto.precio * cantidad
        })
        setItems(prods);
        localStorage.setItem('carrito_vapeando',JSON.stringify(prods));
      }
      
    }else{
      let prods = items;
      prods.push({
        _id:producto._id,
        img:producto.img,
        nombre:producto.nombre,
        precio:producto.precio,
        cantidad:cantidad,
        subtotal:producto.precio * cantidad
      });
      setItems(prods);
      localStorage.setItem('carrito_vapeando',JSON.stringify(prods));
    }
    
  }

  return (
      <>
        <div className="col-md-6 col-lg-4">
          <div className="profile-card-4 text-center">
            <div className="profile-content">
            <div className="profile-name">{producto.nombre}</div>
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-overview">
                      <p>Precio</p>
                      <h4>${producto.precio}</h4>
                  </div>
                </div>
                <div className="col-md-4">
                    <div className="profile-overview">
                      <p></p>
                      <Button variant='success'  onClick={()=>{setshowDetalle(true)}}>
                        Agregar
                      </Button>
                    </div>
                </div>
              </div>
            </div>
          </div> 
        </div>

        <Modal  show={showDetalle}
                onHide={()=>{setshowDetalle(false)}}
                centered>
          <Modal.Header closeButton>
            <Modal.Title>Agregar Al Carrito</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs='6' md='6'>
                  <img src={producto.img} width='100%'/>
                </Col>
                <Col xs='6' md='6'>
                  <Row>
                    <Col xs='12' md='12'>
                      {producto.nombre}
                    </Col>
                  </Row>
                  <br></br>
                  <Row>
                    <Col xs='4' md='4'>
                      <Button block variant="outline-danger"  onClick={()=>{
                        if(cantidad===1){
                          swal({
                            title: "Lo sentimos",
                            text: "No puedes tener menos de 1 producto",
                            icon: "warning",
                          });
                        }else{
                          setCantidad(cantidad-1)
                        }
                      }}>-</Button>
                    </Col>

                    <Col xs='4' md='4'>{cantidad}</Col>

                    <Col xs='4' md='4'>
                      <Button block variant="outline-success" onClick={()=>{
                        if(cantidad===5){
                          swal({
                            title: "Lo sentimos",
                            text: "No puedes agregar mas de 5 productos",
                            icon: "warning",
                          });
                        }else{
                          setCantidad(cantidad+1)
                        }
                        }}>+</Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>{producto.descripcion}</Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button block variant="success" onClick={()=>{
              addCart();
              setshowDetalle(false);
              }}>
                Agregar
            </Button>
          </Modal.Footer>
        </Modal>

      </>
  )
}
export default Product;


