import React ,{ useContext }from 'react'
import classes from './mealItem.module.css'
import MealItemForm from './mealItemForm'
import CartContext from '../../../store/cart-context';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../../../storeRedux/cart-slice';
const MealItem = (props) => {
  // const context = useContext(CartContext);
  const dispatch = useDispatch();
  const addToCartHandler = amount => {
    console.log(amount)
    dispatch(
      cartActions.addToCart({
        id: props.id,
        name: props.name,
        quantity: amount,
        price:props.price
      })
  )

  }
    const price=`$${props.price.toFixed(2)}`
  return (
      <li className={classes.meal}>
          <div>
              <h3>{props.name}</h3>
              <div className={classes.description}>
                {props.description}
              </div>
              <div className=
              {classes.price}>
                {price}
              </div>
          </div>
          <div>
        <MealItemForm onAddToCart={(item)=>addToCartHandler(item)} />
          </div>
    </li>
  )
}

export default MealItem