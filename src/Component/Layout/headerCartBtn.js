import React, { useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./headerCartBtn.module.css";
import { useSelector } from "react-redux";
const HeaderCartBtn = props => {
  const[btnLighted,setBtnLighted]=useState(false)
  const totalQuantity = useSelector(state=>state.cart.totalQuantity);
  const items = useSelector(state=>state.cart.items);

  const btnClasses = `${classes.button} ${btnLighted? classes.bump:''}`;
  useEffect(() => {
    if (totalQuantity === 0) {
      return
    }
    setBtnLighted(true);
  const timer=  setTimeout(() => {
      setBtnLighted(false);
  }, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [items,totalQuantity]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span className={classes.text}>Your Cart</span>
      <span className={classes.badge}>{ totalQuantity}</span>
    </button>
  );
};

export default HeaderCartBtn;
