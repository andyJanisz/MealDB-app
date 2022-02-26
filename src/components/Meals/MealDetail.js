import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getIngredientImg, mealDetails } from "../MealDB/MealDB";

import Ingredients from "../Meals/Ingredient/Ingredients";
import classes from "./MealDetail.module.css";

const MealDetail = () => {
  const [meal, setMeal] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const params = useParams();

  useEffect(() => {
    const getMeal = async () => {
      let mealInfo = await mealDetails(params.id);
      setMeal(mealInfo.meals[0]);

      let data = [];
      for (let i = 1; i <= 20; i++) {
        if (`${mealInfo.meals[0][`strIngredient${i}`]}` === "") break;

        const item = {
          name: mealInfo.meals[0][`strIngredient${i}`],
          measure: mealInfo.meals[0][`strMeasure${i}`],
          img: getIngredientImg(mealInfo.meals[0][`strIngredient${i}`]),
        };

        data.push(item);
      }
      return setIngredients(data);
    };
    getMeal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <div>
        <div className={classes.maxSize}>
          <h4 className={classes.mealName}>
            <span>{meal.strMeal}</span>
          </h4>
          <img
            className={classes.mealImg}
            src={meal.strMealThumb}
            alt={`${meal.strMeal} meal`}
          />
        </div>
      </div>

      <div>
        <div>
          <h4 className={classes.title}>
            <span>Ingredients :</span>
          </h4>
          <div>
            <Ingredients ingredients={ingredients} />
          </div>
        </div>
      </div>
      <div className={classes.maxSize}>
        <h4 className={classes.title}>
          <span>Instructions</span>
        </h4>
        <p className={classes.description}>{meal.strInstructions}</p>
      </div>
    </Fragment>
  );
};

export default MealDetail;
