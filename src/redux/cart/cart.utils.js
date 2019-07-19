export const addItemToCart = (cartItems, cartItemToAdd) => {
  /* The 'find()' method returns the value of the FIRST ELEMENT in the array that satisfies the provided
  testing function. Otherwise 'undefined' is returned */
  const existingCartItem = cartItems.find(
    cartItem => cartItem.id === cartItemToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};
