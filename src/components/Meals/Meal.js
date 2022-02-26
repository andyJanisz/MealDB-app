import React from "react";
import { Link } from "react-router-dom";
import classes from "./Meal.module.css";

const Meal = ({ meal }) => {
  return (
    <div className={classes.container}>
      <div className={classes.imgContainer}>
        <div>
          <img
            className={classes.img}
            alt={meal.strMeal}
            src={meal.strMealThumb}
          />
        </div>

        <div className={classes.mealName}>
          <span>{meal.strMeal}</span>
        </div>
        <div className={classes.lnk}>
          <Link to={`/meal/${meal.idMeal}`}>view recipe</Link>
        </div>
      </div>
    </div>
  );
};

export default Meal;
