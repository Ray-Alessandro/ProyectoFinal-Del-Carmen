import CartWidget from "./CartWidget";
import "./NavBar.css";
import logo from "../../assets/img/logo-dcz.png";

import { Link } from "react-router";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo DragonCardsZ"
            className="navbar-logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/cards">
                Cartas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/category/figures">
                Figuras
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/shopping-cart" style={{ color: "white" }}>
                <CartWidget />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
