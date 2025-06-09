import { create } from "zustand";

const useShoppingCart = create((set) => {
    // Attempt to retrieve cart data from localStorage on initial load
    const cartData = localStorage.getItem("cart");

    const storedCart =
        !cartData
            ? []
            : JSON.parse(localStorage.getItem("cart"));

    return {
        cart: storedCart,
        clearCart: () =>
            set(() => {
                localStorage.removeItem("cart");
                return { cart: [] };
            }),
        addToCart: (product) =>
            set((state) => {
                const updatedCart = [...state.cart, { ...product, qnty: 1 }];
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),
        removeFromCart: (id) =>
            set((state) => {
                const updatedCart = state.cart.filter((item) => item.id !== id);
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),
        increaseQuantity: (id) =>
            set((state) => {
                console.log(id, "updatedCart");
                const updatedCart = state.cart.map((item) =>
                    item.id === id ? { ...item, qnty: item.qnty + 1 } : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),
        decreaseQuantity: (id) =>
            set((state) => {
                console.log(id, "updatedCart");
                const updatedCart = state.cart.map((item) =>
                    item.id === id && item.qnty > 1
                        ? { ...item, qnty: item.qnty - 1 }
                        : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return { cart: updatedCart };
            }),
        isProductInCart: (productId) => {
            const foundItem = useShoppingCart
                .getState()
                .cart.find((item) => item.id === productId);
            return Boolean(foundItem);
        },
    };
});

export default useShoppingCart;
