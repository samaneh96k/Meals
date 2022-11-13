import React ,{ useContext }from 'react'
import classes from './mealItem.module.css'
import MealItemForm from './mealItemForm'
import CartContext from '../../../store/cart-context';
const MealItem = (props) => {
  const context = useContext(CartContext);
  const addToCartHandler = amount => {
    context.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price:props.price
    })

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