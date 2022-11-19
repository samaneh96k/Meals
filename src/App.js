import Header from "./Component/Layout/header";
import React, { useState } from "react";
import Meals from "./Component/Meels/Meals";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./store/CartProvider";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./storeRedux/ui-slice";
function App() {
  const cartIsVisible = useSelector(state => state.ui.cartIsVisible);
  const dispatch = useDispatch();
  const showHideCartHandler = ()=>{
    dispatch(uiActions.toggle(cartIsVisible))
  }
  return (
    <CartProvider CartProvider>
      {cartIsVisible ? <Cart onClose={showHideCartHandler} /> : null}
      <Header onShowCart={showHideCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
