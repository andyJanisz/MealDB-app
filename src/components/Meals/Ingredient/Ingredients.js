import React from "react";
import Ingredient from "./Ingredient";
import classes from "./Ingredients.module.css";

const Ingredients = ({ ingredients }) => {
  return (
    <div className={classes.ingGrid}>
      {ingredients.map((ingredient, index) => (
        <Ingredient key={index} ingredient={ingredient} />
      ))}
    </div>
  );
};

export default Ingredients;
