import React, { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./headerCartBtn.module.css";
import CartContext from "./../../store/cart-context";
const HeaderCartBtn = props => {
  const[btnLighted,setBtnLighted]=useState(false)
  const context = useContext(CartContext);
  const numberOfCartItems = context.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnLighted? classes.bump:''}`;
  useEffect(() => {
    if (context.items.length === 0) {
      return
    }
    setBtnLighted(true);
  const timer=  setTimeout(() => {
      setBtnLighted(false);
  }, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [context.items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{ numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartBtn;
