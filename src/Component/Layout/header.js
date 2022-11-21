import React from 'react';
import headerImage from '../../assets/03.jpg';
import classes from './header.module.css';
import HeaderCartBtn from './headerCartBtn';
const Header = (props) => {
  return (
      <>
          <div className={classes.header}>
              <h1>Meals</h1>
         <div className={classes.btn}>    <HeaderCartBtn onClick={props.onShowCart}></HeaderCartBtn></div>
          </div>
          <div className= {classes['main-image']} >
              <img src={ headerImage} alt=" there is on the table a yummy pizza " />
          </div>
      </>
  )
}

export default Header