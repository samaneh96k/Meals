import Header from "./Component/Layout/header";
import React, { useState } from "react";
import Meals from "./Component/Meels/Meals";
import Cart from "./Component/Cart/Cart";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartIsShow, setCartIsShow] = useState(false);
  const showCartHandler = () => {
    setCartIsShow(true);
  };
  const hideCartHandler = () => {
    setCartIsShow(false);
  };
  return (
    <CartProvider CartProvider>
      {cartIsShow ? <Cart onClose={hideCartHandler} /> : null}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
