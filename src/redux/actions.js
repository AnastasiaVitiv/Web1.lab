export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const addToCart = (ship) => ({
    type: ADD_TO_CART,
    payload: ship
});

export const removeFromCart = ({ shipId, selectedType }) => ({
    type: REMOVE_FROM_CART,
    payload: { shipId, selectedType }
});

export const updateQuantity = ({ shipId, selectedType, quantity }) => ({
    type: UPDATE_QUANTITY,
    payload: { shipId, selectedType, quantity }
});