import "./FormCheckOut.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import CartContext from "../../contexts/CartContext";
import { createOrder } from "../../shared/firebase/firestore";
import Swal from "sweetalert2";

function FormCheckOut() {
    const { cart, clearCart, calculateTotal } = useContext(CartContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        correo: '',
        direccion: '',
        pais: '',
        ciudad: ''
    });

    async function createOrderAndSave() {
        const order = {
            buyer: formData,
            cart: cart,
            total: calculateTotal(),
            date: new Date()
        };
        const orderId = await createOrder(order);

        return orderId;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        Swal.fire({
            title: '¿Confirmar compra?',
            html: `
                <p><strong>Total a pagar:</strong> S/ ${calculateTotal()}</p>
                <p><strong>Comprador:</strong> ${formData.nombres} ${formData.apellidos}</p>
                <p><strong>Email:</strong> ${formData.correo}</p>
            `,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Sí, confirmar pago',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const orderId = await createOrderAndSave();

                Swal.fire({
                    title: '¡Compra exitosa! 🎉',
                    text: `Gracias por tu compra. 😊 Tu número de orden es: ${orderId}`,
                    icon: 'success',
                    confirmButtonColor: '#198754'
                }).then(() => {
                    clearCart();
                    navigate('/');
                });
            }
        });
        
    };

    if (cart.length === 0) {
        return (
            <div className="d-flex justify-content-center align-items-center bg-light flex-column py-5" style={{ minHeight: '90vh' }} >
                <h3 className="text-muted mb-3">😢 No hay productos en el carrito</h3>
                <p className="text-muted">Agrega algunos productos para continuar</p>
                <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                    Ir a la tienda
                </button>
            </div>
        );
    }

    return (
        <main className="container container-form-checkout mt-5 mb-5">
            <div className="row">
                <div className="col-md-6">
                    <h4 className="mb-4">Datos del Comprador</h4>
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="nombres" className="form-label">Nombres</label>
                                <input 
                                    type="text" 
                                    className="form-control text-field" 
                                    id="nombres"
                                    name="nombres"
                                    value={formData.nombres}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                <input 
                                    type="text" 
                                    className="form-control text-field" 
                                    id="apellidos"
                                    name="apellidos"
                                    value={formData.apellidos}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="correo" className="form-label">Correo electrónico</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="correo"
                                name="correo"
                                value={formData.correo}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="direccion" className="form-label">Dirección</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleInputChange}
                                required 
                            />
                        </div>

                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="pais" className="form-label">País</label>
                                <input 
                                    type="text" 
                                    className="form-control text-field" 
                                    id="pais"
                                    name="pais"
                                    value={formData.pais}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label htmlFor="ciudad" className="form-label">Ciudad</label>
                                <input 
                                    type="text" 
                                    className="form-control text-field" 
                                    id="ciudad"
                                    name="ciudad"
                                    value={formData.ciudad}
                                    onChange={handleInputChange}
                                    required 
                                />
                            </div>
                        </div>

                        <div className="text-end">
                            <button type="submit" className="btn btn-primary px-4">
                                <i className="bi bi-credit-card me-2"></i>
                                Confirmar Pago
                            </button>
                        </div>
                    </form>
                </div>

                <div className="col-md-6">
                    <h4 className="mb-4">Resumen de Compra</h4>
                    <div id="cart-summary">
                        {cart.map((item) => (
                            <div key={item.id} className="card mb-3">
                                <div className="card-body d-flex align-items-center">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                                        className="me-3"
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{item.name}</h6>
                                        <p className="mb-0 text-muted">
                                            Cantidad: {item.quantity} x S/ {item.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-end">
                                        <strong>S/ {(item.price * item.quantity).toFixed(2)}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h5 className="mt-3 text-end">
                        Total: <span id="cart-total" className="text-success">S/ {calculateTotal()}</span>
                    </h5>
                </div>
            </div>
        </main>
    );
}

export default FormCheckOut;