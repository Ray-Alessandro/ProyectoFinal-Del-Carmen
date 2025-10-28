import "./Item.css";
import { Link } from "react-router";

function Item({ product }) {
    return (
        <div className="col-sm-8 col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow">
                {product.is_weekly && (
                    <span className="mt-4 badge bg-warning text-dark align-self-center p-2 fs-5 py-2">
                        Producto Destacado
                    </span>
                )}

                <img
                    src={product.image}
                    className="card-img mt-4"
                    alt={`${product.name} figure`}
                />
                <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text text-success mb-3">
                        Precio: <strong>S/ {product.price}</strong>
                    </p>

                    <Link to={`/detail/${product.id}`} className="btn btn-secondary">Ver Detalles</Link>
                </div>
            </div>
        </div>
    );
}

export default Item;