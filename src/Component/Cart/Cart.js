import React, { useContext } from "react";
import classes from "./cart.module.css";
import Modal from "./../Ui/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = props => {
  const context = useContext(CartContext);
  const hasItems = context.items.length > 0;
  const cartItemRemoveHandler = id => {
    context.removeItem(id);
  };
  const cartItemAddHandler = item => {
    context.addItem({...item,amount:1})
  };
  const cartItems = (
    <ul className={classes['cart-items']}>
      {context.items.map(i =>
        <CartItem
          key={i.id}
          name={i.name}
          amount={i.amount}
          price={i.price}
          onRemove={cartItemRemoveHandler.bind(null,i.id)}
          onAdd={cartItemAddHandler.bind(null,i)}
        />
      )}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        {<span>{`$${context.totalAmount.toFixed(2)}`}</span>}
      </div>
      <div className={classes.actions}>
        <button className={classes["button__alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
