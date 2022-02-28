import { useState, useEffect } from "react";
import MealList from "../Meals/MealList";
import { getMeals } from "../MealDB/MealDB";

import classes from "./HomePage.module.css";

const DUMMY_MEALS = [
  {
    idMeal: "52768",
    strMeal: "Apple Frangipan Tart",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/wxywrq1468235067.jpg",
    strTags: "",
    strArea: "British",
    strCategory: "Dessert",
  },
  {
    idMeal: "53037",
    strMeal: "Coddled pork with cider",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/7vpsfp1608588991.jpg",
    strTags: "",
    strArea: "Irish",
    strCategory: "Pork",
  },
  {
    idMeal: "53036",
    strMeal: " Boxty Breakfast",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/naqyel1608588563.jpg",
    strTags: "",
    strArea: "Irish",
    strCategory: "Side",
  },
  {
    idMeal: "53035",
    strMeal: "Ham hock colcannon",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/n41ny81608588066.jpg",
    strTags: "",
    strArea: "Irish",
    strCategory: "Pork",
  },
  {
    idMeal: "53034",
    strMeal: "Japanese Katsudon",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/d8f6qx1604182128.jpg",
    strTags: "",
    strArea: "Japanese",
    strCategory: "Side",
  },
  {
    idMeal: "53033",
    strMeal: "Japanese gohan rice",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/kw92t41604181871.jpg",
    strTags: "",
    strArea: "Japanese",
    strCategory: "Side",
  },
  {
    idMeal: "53032",
    strMeal: "Tonkatsu pork",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/lwsnkl1604181187.jpg",
    strTags: "",
    strArea: "Japanese",
    strCategory: "Pork",
  },
  {
    idMeal: "53031",
    strMeal: "Egyptian Fatteh",
    strMealThumb:
      "https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg",
    strTags: "",
    strArea: "Egyptian",
    strCategory: "Beef",
  },
];

const HomePage = () => {
  const [meals, setMeals] = useState([]);
  const [fetchError, setfetchError] = useState();

  useEffect(() => {
    fetchRandomMeals().catch((error) => {
      setfetchError(error.message);
    });
  }, []);

  const fetchRandomMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  if (fetchError) {
    return (
      <div className={classes.errorMessage}>
        <p> {fetchError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.description}>
        <p>
          This is simple react app that is using TheMealDB API:
          https://www.themealdb.com/api.php Here you have random meals that are
          fetched from API. You can also search for meal in serch bar, list them
          by category or ingredient.
        </p>
      </div>
      {/* <div className={classes.randomMeals}> Dummy Meals </div>
      <MealList meals={DUMMY_MEALS} /> */}
      <div className={classes.randomMeals}> Random Meals </div>
      <MealList meals={meals} />
    </div>
  );
};

export default HomePage;
