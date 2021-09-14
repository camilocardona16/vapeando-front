import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Producto } from "../../interfaces/Producto";
import * as services from "../../Services/services";
import { Modal, Container, Row, Col, Button } from "react-bootstrap";

function Admin() {
  let [showCrear, setshowCrear] = useState(false);
  let [showEditar, setshowEditar] = useState(false);
  let [showBorrar, setshowBorrar] = useState(false);
  let [seleccionado, setSeleccionado] = useState<Producto>({
    nombre: "",
    precio: 0,
    img: "",
    descripcion: ""
  });
  const [productos, setproductos] = useState<Producto[]>([]);

  const loadProductos = async () => {
    const res = await services.getProductos();
    setproductos(res.data);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSeleccionado({ ...seleccionado, [e.target.name]: e.target.value });
  };

  const crear =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await services.CrearProductos(seleccionado);
    console.log(res);
    
  };
  const editar = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(seleccionado);
  };
  const borrar = (producto: Producto) => {
    console.log(producto);
  };

  useEffect(() => {
    loadProductos();
  }, []);
  return (
    <>
      <div className="container">
      <Button onClick={()=>{setshowCrear(true)}} block variant="success">
              Crear producto
        </Button>
        <table className="table table-striped table-inverse table-responsive">
          <thead className="thead-inverse">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => {
              return (
                <tr key={index}>
                  <td>{producto.img}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>{producto.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => {
                        setSeleccionado(producto);
                        setshowEditar(true);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => {
                        borrar(producto);
                      }}
                    >
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* modal Crear */}
      <Modal
        show={showCrear}
        onHide={() => {
          setshowCrear(false);
        }}
        centered
      >
        <form onSubmit={crear}>
          <Modal.Header closeButton>
            <Modal.Title>Crear producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <label className="form-control-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                defaultValue={seleccionado.nombre}
                placeholder="Nombre del producto"
                className="form-control"
                onChange={handleInputChange}
              />
              <label className="form-control-label">Precio:</label>
              <input
                type="number"
                name="precio"
                defaultValue={seleccionado.precio}
                placeholder="Precio"
                className="form-control"
                onChange={handleInputChange}
              />
              <label className="form-control-label">Descripcion:</label>
              <textarea
                name="descripcion"
                defaultValue={seleccionado.descripcion}
                placeholder="Descripcion del producto"
                className="form-control"
                rows={3}
                onChange={handleInputChange}
              ></textarea>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" block variant="success">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>

{/* modal editar */}
      <Modal
        show={showEditar}
        onHide={() => {
          setshowEditar(false);
        }}
        centered
      >
        <form onSubmit={editar}>
          <Modal.Header closeButton>
            <Modal.Title>Editar producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <label className="form-control-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                defaultValue={seleccionado.nombre}
                placeholder="Nombre del producto"
                className="form-control"
                onChange={handleInputChange}
              />
              <label className="form-control-label">Precio:</label>
              <input
                type="number"
                name="precio"
                defaultValue={seleccionado.precio}
                placeholder="Precio"
                className="form-control"
                onChange={handleInputChange}
              />
              <label className="form-control-label">Descripcion:</label>
              <textarea
                name="descripcion"
                defaultValue={seleccionado.descripcion}
                placeholder="Descripcion del producto"
                className="form-control"
                rows={3}
                onChange={handleInputChange}
              ></textarea>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" block variant="success">
              Guardar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default Admin;
