import { createSelector } from 'reselect';

/* There are TWO types of selectors that we can write, the first type is called 'INPUT SELECTOR' and it doesn't 
use 'createSelector'(the one we're importing above from the 'reselect' library) and the second type is called 
'OUTPUT SELECTOR' that uses both the 'Input Selector' and the 'createSelector' to build himself */

/* INPUT SELECTOR - It's just a Function that takes the WHOLE 'state' of our app(the Redux STORE pretty much, the
one we call 'rootReducer' that we export from the 'root-reducer.js' file) and just returns a SLICE from it(that is
one layer deep usually). Here below in our case we're pulling out ONLY the 'cart' portion as we can see */
const selectCart = state => state.cart;

/* OUTPUT SELECTOR - The 'createSelector' takes two arguments, the first argument is an Array that contains ALL
the 'Input Selectors'(in our case we just have one 'Input Selector', the 'selectCart') and the second argument is
a Function that will return the value we want out of the Selector. The argument we pass to this Function are the
OUTPUTS of EACH 'Input Selector' that we've passed inside the Array we have as first argument in the 'createSelector'
in the order that those 'Input Selector' are written, so if for example we have '[selectCart, selectUser]' as 
elements of the Array we pass in the 'createSelector' THEN the arguments we pass inside the Function we use as
SECOND argument in the 'createSelector' has to be '(cart, user)' in THAT specific order. In our case though we ONLY
have the 'selectCart' Input Selector so the ONLY argument we have to pass to the Function is 'cart'. So NOW because
we used the 'createSelector' to create this 'selectCartItems' Selector, it's now a MEMOIZED SELECTOR */
export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
