import React from "react";
import Meal from "./Meal";
import classes from "./MealList.module.css";

const MealList = ({ meals }) => {
  return (
    <div className={classes.mealBox}>
      {meals.map((meal) => (
        <Meal key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
};

export default MealList;
