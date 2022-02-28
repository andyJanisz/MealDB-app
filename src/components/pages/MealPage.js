import { useState, useEffect } from "react";
import { ingLister, categoryList, getMeals } from "../MealDB/MealDB";
import MealList from "../Meals/MealList";

import classes from "./MealPage.modules.css";

const MealPage = () => {
  const [meals, setMeals] = useState([]);
  const [ingList, setIngList] = useState([]);
  const [catList, setCatList] = useState([{ strCategory: "Beef" }]);
  const [ingredient, setIng] = useState("");
  const [category, setCategory] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setfetchError] = useState();

  useEffect(() => {
    fetchRandomMeals().catch((error) => {
      setfetchError(error.message);
    });
    const fetchIng = async () => {
      const data = await ingLister();
      setIngList(data);
      setIsLoading(true);
    };
    const fetchCategories = async () => {
      const data = await categoryList();
      setCatList(data);
    };
    fetchCategories();
    fetchIng();
  }, []);

  const fetchRandomMeals = async () => {
    const data = await getMeals();
    setMeals(data);
  };

  /*
- select by category - pick value and filter in diff component and return meal {}. 
- select by ingredient - ... 
_selectMeal component ? -> takes in 'string',  exports meal obj {} from MealDB 

/To Do : 
 Handle situation where Random is fetching to same "children"
 Error handling in Modal (from fetching etc)
 Sending data between components
 CSS! Modify UI for better looks and UsExp. 
 Add "spinner" functionality
 Mobile ver. 
*/

  return (
    <div>
      <div>
        <div>
          <button onClick={fetchRandomMeals}> Randomize</button>
        </div>
        <div>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onBlur={(e) => setCategory(e.target.value)}
          >
            <option value="0">Select category</option>
            {catList.map((cat) => (
              <option value={cat.strCategory} key={cat.strCategory}>
                {cat.strCategory}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.selector}>
          <select
            id="category"
            value={ingredient}
            onChange={(e) => {
              setIng(e.target.value);
            }}
            onBlur={(e) => {
              setIng(e.target.value);
            }}
          >
            <option value="0">Select ingredient</option>
            {ingList.map((ing) => (
              <option value={ing.strIngredient} key={ing.idIngredient}>
                {ing.strIngredient}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <MealList meals={meals} />
      </div>
    </div>
  );
};

export default MealPage;
