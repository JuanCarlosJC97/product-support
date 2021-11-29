import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Container, Row, Col } from 'react-bootstrap';
import { FormControl, FormLabel } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import Logo from '../images/logo.png'
import Table from 'react-bootstrap/Table'
import Products from '../images/products.jpg'
import './SupportProduct.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);



export default function SupportProduct(props) {
    //Estados
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    //Para cambiar campos
    const [showId, setId] = useState('');
    const [showCode, setCode] = useState('');
    const [showName, setName] = useState('');
    const [showQty, setQty] = useState();
    const [showPrice, setPrice] = useState();
    const [showRealPrice, setRealPrice] = useState();
    const [showMarca, setMarca] = useState('');
    const [showType, setType] = useState('');

    //GET PRODUCTS
    const [listProducts, setListProducts] = useState([]);
    useEffect(() => {
        getEventProd();
    },[]);

    var getEventProd = async function(){
        let resp = await fetch("http://localhost:3001/api/products/",
            {
                method: "GET"
            }
        );
        let awResp = await resp.json();
        //const awResp2 = Array.from(awResp);
        //const awResp2 = Object.values(awResp);
        setListProducts(awResp);
        return;
    };

    //Segunda forma dinamica de consulta
    /* let viewProducts = listProducts.map((product, i) => {
        return(
            <tr key={i}>
                <td>{product.code}</td>
                <td>{product.name}</td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td>{product.realPrice}</td>
                <td>{product.marca}</td>
                <td>{product.type}</td>
            </tr>
        );
    }); */
    
    //DELETE PRODUCT
    var deleteEventProd = async function(id){
        let resp = await fetch("http://localhost:3001/api/products/"+id,
            {
                method: "DELETE"
            }
        );
        let auxResp = await resp.json();
        getEventProd();
        await MySwal.fire({
            tittle: "<strong>"+auxResp.mssg+"</strong>",
            html: (auxResp.status === 1) ? <i>Producto eliminado</i> : <i>ERROR</i>,
            icon: (auxResp.status === 1) ? 'success' : 'error'
        })
        return;
    };

    //Get ONE PRODUCT
    var getEventOneProd = async function(id){
        let resp = await fetch("http://localhost:3001/api/products/"+id,
            {
                method: "GET"
            }
        );
        let awResp = await resp.json();
        //const arrResp = Array.from(awResp);
        const arrResp = Object.values(awResp);

        let idUpdate = arrResp[0];
        let code = arrResp[1];
        let name = arrResp[2];
        let qty = arrResp[3];
        let price = arrResp[4];
        let realPrice = arrResp[5];
        let marca = arrResp[6];
        let type = arrResp[7];

        setId(idUpdate);
        setCode(code);
        setName(name);
        setQty(qty);
        setPrice(price);
        setRealPrice(realPrice);
        setMarca(marca);
        setType(type);

        return;
    };
    //UPDATE PRODUCT
    var updateEventProd = async function(id){
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let resp = await fetch("http://localhost:3001/api/products/"+id,
            {
                method: "PUT",
                headers: myHeaders,
                body: JSON.stringify(
                    {
                        code: document.getElementById("codeUpdate").value,
                        name: document.getElementById("nameUpdate").value,
                        qty: document.getElementById("qtyUpdate").value,
                        price: document.getElementById("priceUpdate").value,
                        realPrice: document.getElementById("realPriceUpdate").value,
                        marca: document.getElementById("marcaUpdate").value,
                        type: document.getElementById("typeUpdate").value
                    }
                )
            }
        );
    
        let auxResp = await resp.json();
        getEventProd();
        await MySwal.fire({
            tittle: "<strong>"+auxResp.mssg+"</strong>",
            html: (auxResp.status === 1) ? <i>Producto modificado</i> : <i>ERROR</i>,
            icon: (auxResp.status === 1) ? 'success' : 'error'
        })
        return;
    };

    //ADD PRODUCT
    var addEventProd = async function(){
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        let resp = await fetch("http://localhost:3001/api/products/",
            {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(
                    {
                        code: document.getElementById("code").value,
                        name: document.getElementById("name").value,
                        qty: document.getElementById("qty").value,
                        price: document.getElementById("price").value,
                        realPrice: document.getElementById("realPrice").value,
                        marca: document.getElementById("marca").value,
                        type: document.getElementById("type").value
                    }
                )
            }
        );

        let auxResp = await resp.json();
        getEventProd();
        await MySwal.fire({
            tittle: "<strong>" + auxResp.mssg + "</strong>",
            html: (auxResp.status === 1) ? <i>Producto agregado</i> : <i>ERROR</i>,
            icon: (auxResp.status === 1) ? 'success' : 'error'
        })
        return;
    };

    function FormModalProduct(props) {
        return (
            <Modal {...props} className="modal" aria-labelledby="contained-modal-title-center">
                <Modal.Header closeButton>
                    <h1>Nuevo Producto</h1>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <>
                        <FormLabel> Código de barras *</FormLabel>
                        <FormControl id="code" />

                        <FormLabel> Nombre *</FormLabel>
                        <FormControl id="name"/>

                        <FormLabel> Cantidad actual *</FormLabel>
                        <FormControl id="qty" type="number" />

                        <FormLabel> Precio público *</FormLabel>
                        <FormControl id="price" type="number" />

                        <FormLabel> Precio real *</FormLabel>
                        <FormControl id="realPrice" type="number" />

                        <FormLabel> Marca *</FormLabel>
                        <FormControl id="marca" />

                        <FormLabel> Tipo *</FormLabel>
                        <FormControl id="type" />
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <>
                        <Button variant="secondary">Cancelar</Button>
                        <Button variant="primary" onClick={addEventProd}>Guardar</Button>
                    </>
                </Modal.Footer>
            </Modal >
        )
    }
    
    function FormModalProductUpdate(props){
        return(
            <Modal {...props} className="modal" aria-labelledby="contained-modal-title-center">
            <Modal.Header closeButton>
                <h1>Modificar Producto</h1>
            </Modal.Header>
            <Modal.Body className="modalBody">
                <>
                    <FormLabel> Código de barras *</FormLabel>
                    <FormControl id="codeUpdate" value={showCode} onChange={(e) => setCode(e.target.value)} />

                    <FormLabel> Nombre *</FormLabel>
                    <FormControl id="nameUpdate" value={showName} onChange={(e) => setName(e.target.value)} />

                    <FormLabel> Cantidad actual *</FormLabel>
                    <FormControl id="qtyUpdate" type="number" value={showQty} onChange={(e) => setQty(e.target.value)} />

                    <FormLabel> Precio público *</FormLabel>
                    <FormControl id="priceUpdate" type="number" value={showPrice} onChange={(e) => setPrice(e.target.value)} />

                    <FormLabel> Precio real *</FormLabel>
                    <FormControl id="realPriceUpdate" type="number" value={showRealPrice} onChange={(e) => setRealPrice(e.target.value)} />

                    <FormLabel> Marca *</FormLabel>
                    <FormControl id="marcaUpdate" value={showMarca} onChange={(e) => setMarca(e.target.value)} />

                    <FormLabel> Tipo *</FormLabel>
                    <FormControl id="typeUpdate" value={showType} onChange={(e) => setType(e.target.value)}/>
                </>
            </Modal.Body>
            <Modal.Footer>
                <>
                    <Button variant="secondary">Cancelar</Button>
                    <Button variant="primary" onClick={() => updateEventProd(showId)}>Guardar</Button>
                </>
            </Modal.Footer>
        </Modal >
        );
    }

    return (
        
        <Container className="supportProduct">
            <Row>
                <Col md={4} lg={4}>
                    <Image className="logo" src={Logo}></Image>
                </Col >
                <Col className="title" sm={6} md={4} lg={4}>
                    <h1>Catálogo de Productos</h1>
                </Col>
                <Col className="col-button-close" sm={4} md={4} lg={4}>
                    <Button className="mb-3 button-inicio" variant="link">Inicio</Button>
                    <Button className="mb-3 button-close" variant="primary">Cerrar sesión</Button>
                </Col>
            </Row>
            <Row className="justify-content-md-end">
                <Col lg={11}>
                    <Button className="mb-3 add-product" variant="light" onClick={() => {setShowAdd(true) }}>Nuevo Producto <FontAwesomeIcon className="icon-plus" icon={faPlus} /></Button>
                </Col>
            </Row>
            <Row>
                <Col xs={9} sm={12} md={12} lg={12}>
                    <Table className="table-products" bordered size="sm" responsive>
                        <thead>
                            <tr>
                                <th>Código de Barras</th>
                                <th>Nombre</th>
                                <th>Cantidad actual</th>
                                <th>Precio público</th>
                                <th>Precio real</th>
                                <th>Marca</th>
                                <th>Tipo</th>
                                <th>Editar</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {/* Segunda forma dinamica de datos
                                {viewProducts} */}

                            {listProducts.map(product => (
                                <tr key={product._id}>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>{product.qty}</td>
                                    <td>{product.price}</td>
                                    <td>{product.realPrice}</td>
                                    <td>{product.marca}</td>
                                    <td>{product.type}</td>
                                    <td>
                                        <Button className="mb-3 add-product" variant="light" onClick={() => {
                                            getEventOneProd(product._id);
                                            setShowUpdate(true);
                                        }}>
                                            ✏️
                                        </Button>
                                    </td>
                                    <td>
                                        <Button className="mb-3 add-product" variant="light" onClick={() => deleteEventProd(product._id)}>
                                        <FontAwesomeIcon className="icon-trash" icon={faTrashAlt} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="justify-content-md">
                <Col lg={12}>
                    <Image className="img-product" src={Products} roundedCircle></Image>
                </Col>
            </Row>

            
            <FormModalProduct
                show={show}
                onHide={() => setShow(false)}
            />
            <FormModalProduct
                show={showAdd}
                onHide={() => setShowAdd(false)}
            />
            <FormModalProductUpdate
                show={showUpdate}
                onHide={() => setShowUpdate(false)}
            />
        </Container>
    )
}


// Forma 3 (depende de mas codigo)
/* //Esto podria ir dentro del input
id="nombre de la variable" onChange={this.manejarCambio} value={this prod} */

//la variable prod es de models
/* manejarCambio(evento) {
    const codigo = evento.target.id;
    let valor = evento.target.value;

    this.setState(state => {
        const productUpdate = state.prod;

        if(codigo === "codigo") {
            valor = parseFloat(valor);
        }

        productUpdate[codigo] = valor;
        return {
            prod: productUpdate,
        }
    });
} */
