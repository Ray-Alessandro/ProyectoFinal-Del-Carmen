import "./ItemDetail.css";

import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import { getProductById} from "../../shared/firebase/firestore";
import CartContext from "../../contexts/CartContext";
import Swal from "sweetalert2";

function ItemDetail() {
    const { idProduct } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addItemToCart, getAvailableStock } = useContext(CartContext);

    const availableStock = product ? getAvailableStock(product.id, product.stock) : 0;


    useEffect(() => {
        setIsLoading(true);
        getProductById(idProduct).then(
            res => {
                setProduct(res);
            }
        ).catch((error) => {
            console.log("Error al cargar los datos", error);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [idProduct]);

    const handleAddToCart = () => {
        if (!product || quantity <= 0) return;

        const result = addItemToCart(product, quantity);
        
        if (result.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Producto agregado!',
                text: `${quantity} ${product.name} agregado(s) al carrito`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
            setQuantity(1);
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Stock insuficiente',
                text: result.message,
                confirmButtonColor: '#198754'
            });
        }
    };

    const handleQuantityChange = (change) => {
        if (!product) return;
        
        const newQuantity = quantity + change;
        const available = getAvailableStock(product.id, product.stock);
        
        if (newQuantity >= 1 && newQuantity <= available) {
            setQuantity(newQuantity);
        }
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 bg-dark text-light flex-column fs-5">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando detalles del producto...</p>
            </div>
        );
    } else if (!product) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 bg-dark text-danger fs-5" style={{ minHeight: '80vh' }} >
                <p>Lo sentimos, no se encontró el producto. 😥</p>
            </div>
        );
    }

    return (
        <section className="item-detail-container">
            <h2>Detalles del Producto</h2>
            <p>Aquí encontrarás información detallada sobre el producto seleccionado.</p>
            <div className="card">
                {product.is_weekly && (
                    <div className="badge bg-warning text-dark d-block fs-6">
                        Artículo Destacado de la Semana
                    </div>
                )}
                <img src={product.image} className="card-img" alt={product.name} />
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">Precio: <strong>S/ {product.price}</strong></p>
                    <p className="card-text">
                        Stock disponible: <strong className={availableStock < 5 ? 'text-danger' : 'text-success'}>
                            {availableStock} unidades
                        </strong>
                    </p>

                    <div className="quantity-controls d-flex justify-content-center align-items-center gap-2 mb-3">
                        <button 
                            className="btn-quantity"
                            onClick={() => handleQuantityChange(-1)}
                            disabled={quantity <= 1}
                        >
                            -
                        </button>
                        <span className="quantity-display fs-4 fw-bold mx-3">{quantity}</span>
                        <button 
                            className="btn-quantity"
                            onClick={() => handleQuantityChange(1)}
                            disabled={quantity >= availableStock || availableStock === 0}
                        >
                            +
                        </button>
                    </div>

                    <button 
                        className="btn btn-primary w-100"
                        onClick={handleAddToCart}
                        disabled={availableStock === 0}
                    >
                        {availableStock === 0 ? 'Sin Stock Disponible' : 'Agregar al Carrito'}
                    </button>
                </div>
            </div>

        </section>
    );
}

export default ItemDetail;