import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import CartContext from "../../contexts/CartContext";
import "./ShoppingCart.css";
import Swal from "sweetalert2";

function ShoppingCart() {
    const { cart, removeItemFromCart, clearCart , calculateTotal } = useContext(CartContext);
    const navigate = useNavigate();

    function handleClearCart() {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Se eliminarán todos los productos del carrito",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#198754',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar carrito',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clearCart();
                Swal.fire({
                    title: '¡Carrito vaciado!',
                    text: 'Todos los productos han sido eliminados',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    };

    function handleCheckout() {
        Swal.fire({
            title: "Confirmación de Compra",
            text: "¿Estás seguro de que deseas proceder con la compra?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, proceder",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/checkout');
            }
        });
    };

    return (
        <main className="shoppingCart-container py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-4 text-dark">🛒 Mi Carrito de Compras</h2>
                
                {cart.length > 0 && (
                    <button 
                        id="delete-shopping-cart" 
                        className="btn btn-success mt-2"
                        onClick={handleClearCart}
                    >
                        <i className="bi bi-trash3 me-1"></i> Vaciar Carrito
                    </button>
                )}
                
                {cart.length > 0 ? (
                    <>
                        <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle text-center">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Categoría</th>
                                        <th>Precio (S/)</th>
                                        <th>Cantidad</th>
                                        <th>Subtotal (S/)</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="shopping-cart-body">
                                    {cart.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    style={{ width: '60px', height: '80px', objectFit: 'cover' }}
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <span className={`badge ${item.category === 'cards' ? 'bg-primary' : 'bg-warning text-dark'}`}>
                                                    {item.category === 'cards' ? 'Cartas' : 'Figuras'}
                                                </span>
                                            </td>
                                            <td>S/ {item.price.toFixed(2)}</td>
                                            <td>{item.quantity}</td>
                                            <td>S/ {(item.price * item.quantity).toFixed(2)}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => removeItemFromCart(item.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="text-end mt-4">
                            <h4>Total: S/ <span id="total-price">{calculateTotal()}</span></h4>
                            <button id="checkout-btn" className="btn btn-success mt-2" onClick={handleCheckout}>
                                <i className="bi bi-credit-card me-1"></i> Finalizar compra
                            </button>
                        </div>
                    </>
                ) : (
                    <div id="empty-cart-message" className="text-center text-muted mt-5">
                        <h4>😢 Tu carrito está vacío</h4>
                        <p>Agrega algunas cartas o figuras para comenzar tu aventura.</p>
                        <Link to="/" className="btn btn-primary mt-2">Ir al Inicio</Link>
                    </div>
                )}
            </div>
        </main>
    );
}

export default ShoppingCart;