import { useState, useEffect } from "react";
import { getMeals } from "../MealDB/MealDB";
import MealList from "../Meals/MealList";

const RandomMealGenerator = () => {
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
      <div>
        <p> {fetchError}</p>
      </div>
    );
  }
  return;
};

export default RandomMealGenerator;
