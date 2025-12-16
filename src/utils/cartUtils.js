export const addToCartForUser = (email, product) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (!registeredUsers[email]) {
        console.error('User not found:', email);
        return false;
    }
    
    if (!registeredUsers[email].cart) {
        registeredUsers[email].cart = [];
    }
    
    const existingItemIndex = registeredUsers[email].cart.findIndex(
        item => item.id === product.id && item.selectedType === product.selectedType
    );
    
    if (existingItemIndex !== -1) {
        registeredUsers[email].cart[existingItemIndex].quantity += product.quantity || 1;
    } else {
        registeredUsers[email].cart.push({
            ...product,
            quantity: product.quantity || 1
        });
    }
    
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    updateCurrentCart(email);
    
    return true;
};

export const getCartForUser = (email) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (!registeredUsers[email] || !registeredUsers[email].cart) {
        return [];
    }
    
    return registeredUsers[email].cart;
};

export const updateCurrentCart = (email) => {
    const cart = getCartForUser(email);
    localStorage.setItem('currentCart', JSON.stringify(cart));
};

export const loadUserCart = (email) => {
    const cart = getCartForUser(email);
    localStorage.setItem('currentCart', JSON.stringify(cart));
    return cart;
};

export const removeFromUserCart = (email, productId, selectedType) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (!registeredUsers[email] || !registeredUsers[email].cart) return;
    
    registeredUsers[email].cart = registeredUsers[email].cart.filter(
        item => !(item.id === productId && item.selectedType === selectedType)
    );
    
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    updateCurrentCart(email);
};

export const updateQuantityInUserCart = (email, productId, selectedType, quantity) => {
    if (quantity < 1) {
        removeFromUserCart(email, productId, selectedType);
        return;
    }
    
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (!registeredUsers[email] || !registeredUsers[email].cart) return;
    
    const itemIndex = registeredUsers[email].cart.findIndex(
        item => item.id === productId && item.selectedType === selectedType
    );
    
    if (itemIndex !== -1) {
        registeredUsers[email].cart[itemIndex].quantity = quantity;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        updateCurrentCart(email);
    }
};

export const clearUserCart = (email) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (registeredUsers[email]) {
        registeredUsers[email].cart = [];
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        updateCurrentCart(email);
    }
};

export const getCurrentCart = () => {
    return JSON.parse(localStorage.getItem('currentCart') || '[]');
};

export const initializeCartForNewUser = (email) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    if (!registeredUsers[email]) return;
    
    if (!registeredUsers[email].cart) {
        registeredUsers[email].cart = [];
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
    
    localStorage.setItem('currentCart', JSON.stringify([]));
};