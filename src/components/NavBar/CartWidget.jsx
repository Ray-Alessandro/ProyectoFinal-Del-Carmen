import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import "./CartWidget.css";

function CartWidget() {
  const { countItemsInCart } = useContext(CartContext);
  const itemCount = countItemsInCart();

  return (
    <div className="cart-widget">
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </div>
  );
}

export default CartWidget;