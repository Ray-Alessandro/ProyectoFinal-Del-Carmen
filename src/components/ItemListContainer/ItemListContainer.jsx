import "./ItemListContainer.css";

import { useEffect, useState } from "react";
import { getWeeklyProducts, getProductByCategory } from "../../shared/firebase/firestore";
import { useParams } from "react-router";

import Item from "../Item";

function ItemListContainer() {
  const [listProducts, setListProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { categoryName } = useParams();

  useEffect(() => {
    setIsLoading(true);
    if (categoryName) {
      getProductByCategory(categoryName).then(
        res => {
          console.log(res);
          setListProducts(res);
        }
      ).catch((error) => {
        console.log("Error al cargar los datos", error);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      getWeeklyProducts().then(
        res => {
          console.log(res);
          setListProducts(res);
        }
      ).catch((error) => {
        console.log("Error al cargar los datos", error);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  }, [categoryName])


  function getCategoryString(categoryName) {
    switch (categoryName) {
      case "figures":
        return "⚔️✨ Figuras Legendarias ✨⚔️";
      case "cards":
        return "⚔️🃏 Cartas de Batalla 🃏⚔️";
      default:
        return "";
    }
  }


  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 bg-dark text-light flex-column fs-5" style={{ minHeight: '90vh' }}>
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  } else if (listProducts.length === 0 && !isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center bg-dark fs-5" style={{ minHeight: '90vh' }}>
        <h3 className="text-danger">No se encontraron productos en esta categoría. 😴</h3>
      </div>
    );
  }

  return (
    <div>
      <section className="hero text-center text-light py-5 bg-dark">
        <div className="container">
          <h1 className="fw-bold hero-title">¡Bienvenido a DragonCardsZ!</h1>
          <p className="hero-subtitle mt-4">
            Vive la experiencia definitiva en cartas coleccionables y figuras de tus personajes favoritos.
          </p>
        </div>
      </section>
      
      <section className="week-cards-container p-5 bg-light">
        {
          categoryName === undefined ?
            <h2 className="text-center mb-4 text-dark">
              💥🐲 ¡Ofertas Semanales del Dragón! 🐲💥
            </h2>
            : <h2 className="text-center mb-4 text-dark">{getCategoryString(categoryName)}</h2>
        }

        <div id="carousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner" id="carousel-inner">

            {listProducts.map((product, index) => (
              <div key={product.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                <div className="d-flex justify-content-center">
                  <Item product={product} />
                </div>
              </div>
            ))}
            
          </div>

          <button className="carousel-control carousel-control-prev bg-dark" type="button" data-bs-target="#carousel"
            data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control carousel-control-next bg-dark" type="button" data-bs-target="#carousel"
            data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
          </button>
        </div>
      
      </section>
    </div>
  );
}
export default ItemListContainer;