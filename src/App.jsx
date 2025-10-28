
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";

import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ShoppingCart from "./components/ShoppingCart";
import ItemDetail from "./components/ItemDetail";
import { CartContextProvider } from "./contexts/CartContext";
import FormCheckOut from "./components/FormCheckOut/FormCheckOut";

function App() {
  return (
    <div className="w-100 h-100 d-flex flex-column">
      <CartContextProvider>
        <BrowserRouter>
          <NavBar />

          <Routes>
            <Route path="/" element={<ItemListContainer/>} />
            <Route path="/category/:categoryName" element={<ItemListContainer />} />
            <Route path="/shopping-cart" element={<ShoppingCart />}/>
            <Route path="/detail/:idProduct" element={<ItemDetail />} />
            <Route path="/checkout" element={<FormCheckOut />} />
            <Route path="*" element={<div className="no-found bg-dark text-light" ><p className="text-danger fs-2" >Error 404 - Página no encontrada 😢</p></div>} />
          </Routes>
        </BrowserRouter>
      </CartContextProvider>
    </div>
  );
}

export default App;
