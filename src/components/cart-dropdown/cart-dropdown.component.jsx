import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from './../custom-button/custom-button.component';
import CartItem from './../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

/* The 'dispatch' we're passing as prop here below is available to us thanks to the 'connect' HOC of 
'react-redux', so because we only need to dispatch the 'toggleCartHidden' action we choosed to NOT use
the 'mapDispatchToProps' and instead use the 'dispatch' function DIRECTLY */
const CartDropdown = ({ cartItems, history, dispatch }) => {
  return (
    <div className="cart-dropdown">
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems
});

/* The order in which we have to apply the 'withRouter' and 'connect' High Order Components in this
case is IMPORTANT. We have to apply FIRST the 'withRouter' and THEN the 'connect' */
export default withRouter(connect(mapStateToProps)(CartDropdown));
