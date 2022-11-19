import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
    name: "cart",
    initialState:{items:[],totalQuantity:0,totalAmount:0},
    reducers: {
         addToCart: (state, action) => {
            const itemInCart = state.items.find((item) => item.id === action.payload.id);
            state.totalQuantity+=action.payload.quantity;
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
       
        state.items.push({ ...action.payload, quantity:action.payload.quantity });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
        item.quantity++;
        state.totalQuantity++;
    },
    decrementQuantity: (state, action) => {
        const item = state.items.find((item) => item.id === action.payload);
       
      if (item.quantity === 1) {
        const removeItem = state.items.filter((item) => item.id !== action.payload);
          state.items = removeItem;
      
      }
      
      else {
        item.quantity--;
        }
        state.totalQuantity--
    },
    removeItem: (state, action) => {
      const removeItem = state.items.filter((item) => item.id !== action.payload);
      state.items = removeItem;
    },
  
    }

})
export const cartActions = cartSlice.actions;
export default cartSlice;