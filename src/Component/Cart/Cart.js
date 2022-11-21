import React, {useState} from "react";
import classes from "./cart.module.css";
import Modal from "./../Ui/Modal";
import CartItem from "./CartItem";
import CheckOut from "./checkOut";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../storeRedux/cart-slice";

const Cart = props => {
  const [isCheckOut,setIsCheckOut]=useState(false)
  const [isSubmiting,setIsSubmiting]=useState(false)
  const [didSubmit,setDidSubmit]=useState(false)
 const items=useSelector(state=>state.cart.items)
  const dispatch = useDispatch();
  const hasItems = items.length > 0;
  const cartItemRemoveHandler = id => {
    dispatch(cartActions.decrementQuantity(id))
  };
  const cartItemAddHandler = id => {
   dispatch(cartActions.incrementQuantity(id))
  };
  const orderHandler = () => {
    setIsCheckOut(true)
  }
  const clearItemsHandler = () => {
    dispatch(cartActions.clearCart())
}
  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    items.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return {totalPrice, totalQuantity}
  }
  const submitHandler =async (userData) => {
    setIsSubmiting(true)
     await fetch('https://meals-622e2-default-rtdb.firebaseio.com/order.json', {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: items
      })
    });
    setIsSubmiting(false);
    setDidSubmit(true);
   
  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {items.map(i =>
        <CartItem
          key={i.id}
          name={i.name}
          amount={i.quantity}
          price={i.price}
          onRemove={()=>cartItemRemoveHandler(i.id)}
          onAdd={()=>cartItemAddHandler(i.id)}
        />
      )}
    </ul>
  );
  const cartModalContent = (<>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        {<span>{`$${getTotal().totalPrice.toFixed(2)}`}</span>}
      </div>
      {isCheckOut &&
        <CheckOut onCancel={props.onClose} onClear={clearItemsHandler} onConfirm={submitHandler} />}
      {!isCheckOut &&
      <div className={classes.actions}>
      <button className={classes["button__alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>}
  </>)
  const isSubmitingModalContent = <p>Sending order data ...</p>;
  const didSubmitModalContent=<p>Successfully sent the Order!</p>
  return (
    <Modal onClose={props.onClose}>
      {!isSubmiting&& !didSubmit&& cartModalContent}
      {isSubmiting&& isSubmitingModalContent}
      {!isSubmiting&&didSubmit&& didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
