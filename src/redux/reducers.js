import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY } from './actions';

const initialState = {
    cartItems: []
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const existingItem = state.cartItems.find(item => 
                item.id === action.payload.id && item.selectedType === action.payload.selectedType
            );
            
            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item =>
                        item.id === action.payload.id && item.selectedType === action.payload.selectedType
                            ? { 
                                ...item, 
                                quantity: item.quantity + action.payload.quantity,
                                totalPrice: item.totalPrice + action.payload.totalPrice
                            }
                            : item
                    )
                };
            }
            
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => 
                    !(item.id === action.payload.shipId && item.selectedType === action.payload.selectedType)
                )
            };

        case UPDATE_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.shipId && item.selectedType === action.payload.selectedType
                        ? { ...item, quantity: action.payload.quantity }
                        : item
        )
    };

        default:
            return state;
    }
};

export default cartReducer;