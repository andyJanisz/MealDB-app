import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";

import { searchMeal } from "../MealDB/MealDB";
import MealList from "../Meals/MealList";

const SearchPage = () => {
  const [meals, setMeals] = useState([]);
  const [isEmpty, setIsEmpty] = useState([true]);
  let { param } = useParams();

  useEffect(() => {
    searchByName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchByName = async () => {
    const data = await searchMeal(param);
    if (data) {
      setIsEmpty(false);
      return setMeals(data);
    }
  };

  return (
    <Fragment>
      <div>
        {meals && !isEmpty > 0 ? (
          <p>
            <span>{`${meals.length} meals found for "${param}"`}</span>
          </p>
        ) : (
          <div>
            <span>{`No meals found for "${param}"`}</span>
          </div>
        )}
      </div>
      <div>
        <MealList meals={meals} />
      </div>
    </Fragment>
  );
};

export default SearchPage;
