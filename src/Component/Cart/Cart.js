import React, { useContext ,useState} from "react";
import classes from "./cart.module.css";
import Modal from "./../Ui/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./checkOut";
const Cart = props => {
  const [isCheckOut,setIsCheckOut]=useState(false)
  const [isSubmiting,setIsSubmiting]=useState(false)
  const [didSubmit,setDidSubmit]=useState(false)
  const context = useContext(CartContext);
  const hasItems = context.items.length > 0;
  const cartItemRemoveHandler = id => {
    context.removeItem(id);
  };
  const cartItemAddHandler = item => {
    context.addItem({...item,amount:1})
  };
  const orderHandler = () => {
    setIsCheckOut(true)
  }
  const submitHandler =async (userData) => {
    setIsSubmiting(true)
    const res = await fetch('https://meals-622e2-default-rtdb.firebaseio.com/order.json', {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: context.items
      })
    });
    setIsSubmiting(false);
    setDidSubmit(true);
    context.clearCart()
  }
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
  const cartModalContent = (<>
    {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        {<span>{`$${context.totalAmount.toFixed(2)}`}</span>}
      </div>
      {isCheckOut &&
        <CheckOut onCancel={props.onClose} onConfirm={submitHandler} />}
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
