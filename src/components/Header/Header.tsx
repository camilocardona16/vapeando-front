import React, {useState,useContext} from 'react';
import swal from 'sweetalert';

import './Header.css';
import {Link} from 'react-router-dom';
import {Modal,Button,Container,Row,Col,Form,Accordion,Card} from 'react-bootstrap';
import {Badge} from 'react-bootstrap';
import { Carrito } from '../../interfaces/carrito';
import { Usuario } from '../../interfaces/Usuario';
import { factura } from '../../interfaces/factura';

export default function Header() {
  // controla la apertura y cirrer de modals
  let[showCarrito,setshowCarrito]=useState(false);
  let[showLogin,setshowLogin]=useState(false);
  let[showCrear,setshowCrear]=useState(false);
  let[showMiAccount,setshowMiAccount]=useState(false);

  // controla la autenticacion del usuario si esta o no esta autenticado
  let[autenticado,setAutenticado]=useState(false);
  let[datosUser,setDatosUser]=useState<Usuario>();

  // controla los items del carrito. 
  let[items,setItems]=useState<Carrito[]>([]);

  // controla el resultado total del valor del carrito
  let[factura,setFactura]=useState(0);
  let[totalItems,setTotalItems]=useState(0);

  // variable para almacenar mis facturas:
  let[misFac,setMisFac]=useState<factura[]>([]);

  function facturar(){
    let total=0;
    let tp=0;
    for (let i = 0; i < items.length; i++) {
      total=total+items[i].subtotal;
      tp=tp+items[i].cantidad;
    }
    setTotalItems(tp);
    setFactura(total);
  }

  async function misFacturas(){
    
    // setMisFac(facs);
  }

  function pagarCuenta() {
    if(autenticado==false){
      return swal({title: "Debes estar autenticado para confirmar la compra",icon: "warning",})
    }
    let usuarioString= localStorage.getItem('usuario_vapeando');
    let productosString = localStorage.getItem('carrito_vapeando');
    if(usuarioString && productosString){
      let data={
        'productos':JSON.parse(productosString),
        'totalI':totalItems,
        'totalP':factura,
        'usuario':JSON.parse(usuarioString).nombre
      }
    }
    // agregar a la base de datos en facturas.
    setshowCarrito(false);
    swal({title: "Facturado",icon: "success",});
    setItems([]);
  }

  function eliminar(pos:number){
    let productosString = localStorage.getItem('carrito_vapeando');
    if(productosString){
      const prods=JSON.parse(productosString);
      setTotalItems(totalItems-(items[pos].cantidad));
      let news= prods.splice(pos,1)
      setItems(news);
      setshowCarrito(false);
      localStorage.setItem('carrito_vapeando',JSON.stringify(news));
    }
  }

  function login(){
  //   event.preventDefault();
  //   let data={
  //     'correo':event.target.elements.correo.value,
  //     'clave':event.target.elements.clave.value
  //   };
  //   auth.signInWithEmailAndPassword(data.correo,data.clave).then((userCredential) => {
  //   setDatosUser(userCredential.user);
  //   setAutenticado(true);
  //   setshowLogin(false);
  //   swal({title: "Acceso correcto a Vapeando",icon: "success"})

  // })
  // .catch((e) => {
  //   console.log(e);
  //   if(e.code=='auth/wrong-password'){
  //     swal({title: "Usuario o contraseña incorrectos",icon: "warning"})
  //   }
  // });
  }

  function crearCuenta(){
    // event.preventDefault();
    // if(event.target.elements.clave.value !=event.target.elements.clave2.value){
    //   return swal({title: "Las contraseñas no coinciden",icon: "warning"})
    // }
    // let data={
    //   'correo':event.target.elements.correo.value,
    //   'clave':event.target.elements.clave.value
    // };
    // auth.createUserWithEmailAndPassword(data.correo,data.clave).then((res)=>{
    //   setDatosUser(res.user)
    //   setAutenticado(true);
    //   setshowCrear(false);
    //   swal({title: "Usuario registrado correctamente",icon: "success"})
    // }).catch(e=>{
    //   if(e.code=='auth/email-already-in-use'){
    //     swal({title: "Este usuario ya existe !",icon: "warning"})
    //   }
    // });

  }



    return (
      <>
        <header>
          <nav className="container navbar navbar-expand-md justify-content-between">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <Link className="itemNav" to='/'><strong>Home</strong></Link>
                </li>
                <li className="nav-item">
                    <Link className="itemNav" to='/membresia'><strong>Membresia</strong></Link>
                </li>
                <li className="nav-item">
                    <Link className="itemNav" to='/nosotros'><strong>Nosotros</strong></Link>
                </li>
                <li className="nav-item">
                    <Link className="itemNav" to='/contacto'><strong>Contacto</strong></Link>
                </li>
                <li className="nav-item">
                    <Link className="itemNav" to='/admin'><strong>Admin</strong></Link>
                </li>
              </ul>
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                {autenticado ?
                <>
                  <li><button onClick={()=>{setshowMiAccount(true)}} id="btn-ingresar" type="button">Mis facturas</button></li>
                  <li><button onClick={()=>{setAutenticado(false);swal({title: "Saliste de tu cuenta",icon: "success"})}} id="btn-ingresar" type="button">Salir</button></li>
                </>
                :
                <>
                  <li><button onClick={()=>{setshowLogin(true)}} id="btn-ingresar" type="button">Ingresar</button></li>
                  <li><button onClick={()=>{setshowCrear(true)}} id="btn-crear" type="button" >Crear Cuenta</button></li>
                </>
}
                <li><button onClick={()=>{setshowCarrito(true)}} type="button">Mi Carrito <i className="fa fa-cart-plus"></i></button></li> 
              </ul>
          </nav>
        </header>

        {/* Modal Carrito  */}
        <Modal  show={showCarrito}
                onHide={()=>{setshowCarrito(false)}}
                onEnter={()=>{facturar()}}
                onExit={()=>{setTotalItems(0)}}
                size="lg"
                centered>
          <Modal.Header closeButton>
            <Modal.Title>Productos en carrito: <Badge className='bg-primary text-with'>{totalItems}</Badge></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col xs='3' md='3'>Producto</Col>
                <Col xs='3' md='3'>Precio</Col>
                <Col xs='3' md='3'>Cantidad</Col>
                <Col xs='3' md='3'>SubTotal</Col>
              </Row>
              {items.length===0? <Row><Badge className='bg-primary text-with'>Agrega productos al carrito</Badge></Row>:null}
              {items.map((item,index)=>{
                return <>
                  <Row>
                    <Col xs='3' md='3'> <img src={item.img} className="w-100" alt='imgcarrito'></img>
                     {item.nombre}
                    </Col>
                    <Col xs='3' md='3'>{item.precio}</Col>
                    <Col xs='3' md='3'>{item.cantidad}</Col>
                    <Col xs='3' md='3'>{item.subtotal} <Button variant='danger' onClick={()=>{eliminar(index)}}>X</Button></Col>
                  </Row>
                </>
              })}
              
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='warning' onClick={()=>{setshowCarrito(false)}}>Cerrar</Button>
            {items.length!==0?
            <Button variant='success' onClick={()=>{pagarCuenta()}}>
              Pagar: {factura}
            </Button>:null}
          </Modal.Footer>
        </Modal>

      {/* Modal Login */}
        <Modal  show={showLogin}
                onHide={()=>{setshowLogin(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Iniciar Sesión</Modal.Title>
          </Modal.Header>
          <Form onSubmit={()=>{login()}}>
            <Modal.Body >
              <Container>
                <Form.Group controlId="correo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="ingresa tu correo" />
                </Form.Group>

                <Form.Group controlId="clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" />
                </Form.Group>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={()=>{setshowLogin(false)}}>Cerrar</Button>
              <Button variant="success" type="submit">ingresar</Button>
            </Modal.Footer>
          </Form>
        </Modal>

      {/* Modal CreateAcount */}
      <Modal  show={showCrear}
                onHide={()=>{setshowCrear(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Cuenta</Modal.Title>
          </Modal.Header>
          <Form onSubmit={()=>{crearCuenta()}}>
            <Modal.Body >
              <Container>
                <Form.Group controlId="correo">
                  <Form.Label>Correo</Form.Label>
                  <Form.Control type="email" placeholder="ingresa tu correo" />
                </Form.Group>

                <Form.Group controlId="clave">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Contraseña" minLength={6} />
                </Form.Group>
                <Form.Group controlId="clave2">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control type="password" placeholder="Confirmar Contraseña" />
                </Form.Group>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={()=>{setshowCrear(false)}}>Cerrar</Button>
              <Button variant="success" type="submit">Crear cuenta</Button>
            </Modal.Footer>
          </Form>
        </Modal>
      
      {/* Modal mis facturas */}
      <Modal  show={showMiAccount}
              onEnter={()=>{misFacturas()}}
              onHide={()=>{setshowMiAccount(false)}}>
          <Modal.Header closeButton>
            <Modal.Title>Mis Facturas</Modal.Title>
          </Modal.Header>
            <Modal.Body >
            {misFac.length===0? <Row><Badge className='bg-primary text-with'>Aun no tienes facturas registradas</Badge></Row>:null}
              <Accordion>
                {misFac.map((fac)=>{
                  return <Card>
                    <Card.Header>
                      <Accordion.Toggle as={Button} variant="link" eventKey={fac._id}>{fac._id}</Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey={fac._id}>
                      <Card.Body>
                        <Row>
                          <Col className='text-center'><strong>Item</strong></Col>
                          <Col className='text-center'><strong>Cantidad</strong></Col>
                          <Col className='text-center'><strong>Subtotal</strong></Col>
                        </Row>
                        {fac.productos.map((producto)=>{
                        return <Row>
                          <Col> <img src={producto.img} className="w-100" alt='imgcarrito'></img>
                            {producto.nombre}
                          </Col>
                          <Col className='text-center'>{producto.precio}</Col>
                          <Col className='text-center'>{producto.subtotal}</Col>
                        </Row>
                        })}
                        <Badge className='bg-primary text-with'>Articulos: {fac.totalI}</Badge>
                        <Badge className='bg-primary text-with'>Total: {fac.totalF}</Badge>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                })}
              </Accordion>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={()=>{setshowMiAccount(false)}}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}
