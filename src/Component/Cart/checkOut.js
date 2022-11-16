import React, { useRef, useState } from "react";
import classes from "./checkOut.module.css";
const CheckOut = props => {
  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });
  const isEmpty = value => value.trim() === "";
  const isNotFiveChars = value => value.trim().length !== 5;
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = e => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    const enteredNameValid = !isEmpty(enteredName);
    const enteredStreetValid = !isEmpty(enteredStreet);
    const enteredPostalValid = !isEmpty(enteredPostal);
    // const enteredCityValid=!isEmpty(enteredCity)
    const enteredCityValid = !isNotFiveChars(enteredCity);
    setFormInputValidity({
      name: enteredNameValid,
      street: enteredStreetValid,
      postalCode: enteredPostalValid,
      city: enteredCityValid
    });
    const formIsValid =
      enteredNameValid &&
      enteredStreetValid &&
      enteredPostalValid &&
      enteredCityValid;
    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostal,
      city: enteredCity
    });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${formInputValidity.name
          ? ""
          : classes.invalid}`}
      >
        <label for="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputValidity.name && <p>Please enter a valid name </p>}
      </div>
      <div
        className={`${classes.control} ${formInputValidity.street
          ? ""
          : classes.invalid}`}
      >
        <label for="street"> Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputValidity.street && <p>Please enter a valid street </p>}
      </div>
      <div
        className={`${classes.control} ${formInputValidity.postalCode
          ? ""
          : classes.invalid}`}
      >
        <label for="postal"> Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
        {!formInputValidity.postalCode &&
          <p>Please enter a valid postal code (5 character long) </p>}
      </div>
      <div
        className={`${classes.control} ${formInputValidity.city
          ? ""
          : classes.invalid}`}
      >
        <label for="city"> City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputValidity.city && <p>Please enter a valid city </p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel{" "}
        </button>
        <button className={classes.submit}>Check Out</button>
      </div>
    </form>
  );
};

export default CheckOut;
