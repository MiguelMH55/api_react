import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import axios from 'axios';
// import 'boostrap/dist/css/boostrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



function App() {
  // const [count, setCount] = useState(0)
  // const [ID, setID]         = useState('');
  // const [Nombre, setNombre] = useState('');
  const [Id, setId]     = useState('');
  const [Nombre, setNombre] = useState('');
  const [Estado, setEstado] = useState([]);
  const [Roles,  setRoles]  = useState([]);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)

  const URL = "https://localhost:7249/api/t_roles";

  const cargarDatos = async () => {
    await axios.get(URL).then(Response => {
      console.log(Response.data);
      setEstado(Response.data);
    })
  }
  useEffect(() => {
    cargarDatos();
  }, [])

  const peticionPost= async()=>{
  await axios.post(URL,{
    roL_NOMBRE : Nombre
  })
      cargarDatos();
  }
  const eliminarRol = async(id)=>{
    await axios.delete(`${URL}/${id}`)
    cargarDatos();
  }

  const cargarRolID = ()=>{

  }

  const editarRol = ()=>{
    
  }

  return (
    <div>
      {/* <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>USER</td>
            <button type="button" className="btn btn-secondary">Editar</button>

            <button type="button" className="btn btn-danger">Eliminar</button>
          </tr>

        </tbody>
      </table> */}

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {Estado.map(gestor => (
            <tr key={gestor.roL_ID}>
              <td>{gestor.roL_ID}</td>
              <td>{gestor.roL_NOMBRE}</td>
              <td>
                <button className="btn btn-primary" onClick="">Editar</button> {"  "}
                <button className="btn btn-danger" onClick={()=>eliminarRol(gestor.roL_ID)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <div>
      <Button color="danger" onClick={toggle}>
        Registro
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
          Formulario de registro de roles
        </ModalHeader>
        <ModalBody>
        
          <label>Ingrese los datos:</label>
        <br />
        <div className="form-group">
          {/* <br />
          <label>ID de rol </label>
          <br />
          <input type="text" onChange={(e) => setId(e.target.value)} className="form-control" name="Id" value=""/>
          <br /> */}
          <br />
          <label>Nombre de rol </label>
          <br />
          <input type="text" onChange={(e) => setNombre(e.target.value)} className="form-control" name="Nombre"/>
          <br />
        </div>
 
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-primary" onClick={()=>peticionPost()}>Guardar</button>
        <button className="btn btn-danger" onClick="">Cancelar</button>
        
      </ModalFooter>
      </Modal>
      </div>
      {/* <Button color="danger" onClick={toggle}>
        Registro
      </Button> */}

      {/* FORMULARIO DE EDICION */}

      {/* <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>
          Formulario de edicion de roles
        </ModalHeader>
        <ModalBody>
        <label>Ingrese los datos:</label>
        <br />
        <div className="form-group">
          <br />
          <label>Nombre de rol </label>
          <br />
          <input type="text" className="form-control" name="nombre" value=""/>
          <br />
        </div>
        </ModalBody>
        <ModalFooter>
        <button className="btn btn-primary" onClick="">Editar</button>
        <button className="btn btn-danger" onClick="">Cancelar</button>
      </ModalFooter>
      </Modal> */}

    </div>


  )
}

export default App
