import { createContext, useState } from "react";

const CartContext = createContext();

export function CartContextProvider(props) {
    const [cartItems, setCartItems] = useState([]);

    function addItemToCart(item, quantity) {
        const newCartItems = structuredClone(cartItems);

        const existingItemIndex = newCartItems.findIndex(cartItem => cartItem.id === item.id);
        
        if (existingItemIndex !== -1) {
            // Verificar si agregar la cantidad excedería el stock
            const newQuantity = newCartItems[existingItemIndex].quantity + quantity;
            if (newQuantity > item.stock) {
                return { success: false, message: `Solo puedes agregar ${item.stock - newCartItems[existingItemIndex].quantity} unidad(es) más` };
            }
            newCartItems[existingItemIndex].quantity = newQuantity;
        } else {
            // Verificar stock al agregar por primera vez
            if (quantity > item.stock) {
                return { success: false, message: 'No hay suficiente stock disponible' };
            }
            newCartItems.push({ ...item, quantity: quantity });
        }
        
        setCartItems(newCartItems);
        return { success: true, message: 'Producto agregado al carrito' };
    }

    function removeItemFromCart(itemId) {
        const newCartItems = structuredClone(cartItems);
        const updatedCartItems = newCartItems.filter(cartItem => cartItem.id !== itemId);
        setCartItems(updatedCartItems);
    }

    function clearCart() {
        setCartItems([]);
    }

    function countItemsInCart() {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }

    function calculateTotal() {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    }

    function getAvailableStock(productId, productStock) {
        const itemInCart = cartItems.find(item => item.id === productId);
        const quantityInCart = itemInCart ? itemInCart.quantity : 0;
        return productStock - quantityInCart;
    }

    return (
        <CartContext.Provider value={{ cart: cartItems, addItemToCart, removeItemFromCart, clearCart, countItemsInCart, calculateTotal, getAvailableStock }}>
            {props.children}
        </CartContext.Provider>
    );   
}

export default CartContext;