import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import LoadingSpiner from "../UI/LoadingSpinner";
import {
  ingLister,
  categoryList,
  getMeals,
  filterByCategory,
  filterByIngredient,
} from "../MealDB/MealDB";
import MealList from "../Meals/MealList";
import classes from "./MealPage.module.css";

const MealPage = () => {
  const [meals, setMeals] = useState([]);

  const [ingList, setIngList] = useState([]);
  const [catList, setCatList] = useState([{ strCategory: "Beef" }]);

  const [ingredient, setIng] = useState("");
  const [category, setCategory] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    const fetchIng = async () => {
      const data = await ingLister();
      setIngList(data);
    };
    const fetchCategories = async () => {
      const data = await categoryList();
      setCatList(data);
    };
    fetchCategories().catch((error) => {
      setError(error.message);
    });
    fetchIng().catch((error) => {
      setError(error.message);
    });

    if (params.param) {
      setIng(params.param);
      setLoaded(true);
    } else {
      if (!loaded) {
        fetchRandomMeals().catch((error) => {
          setError(error.message);
        });
      }
    }
  }, [params, loaded]); // FETCHING SELECT LISTS

  useEffect(() => {
    // FILTER BY CATEGORY --

    const fetchByCategory = async () => {
      setIsLoading(true);
      const data = await filterByCategory(category);
      if (category.length === 1) return;
      if (data === null) return;
      if (data !== undefined) setIsLoading(false);
      setLoaded(true);
      setMeals(data);
    };
    if (category.length > 1) {
      fetchByCategory().catch((error) => {
        setError(error.message);
      });
      setIng("");
    }
  }, [category]);

  useEffect(() => {
    // FILTER BY INGR --
    const fetchByIng = async () => {
      setIsLoading(true);
      const data = await filterByIngredient(ingredient);
      console.log("ingr" + ingredient);
      if (ingredient.length === 1) return;
      if (data === null) return;
      if (data !== undefined) setIsLoading(false);

      setMeals(data);
    };
    if (ingredient.length > 1) {
      setLoaded(true);
      fetchByIng().catch((error) => {
        setError(error.message);
      });
      setCategory("");
    }
  }, [ingredient]);

  // -------- FETCH RANDOM MEALS!
  const fetchRandomMeals = async () => {
    console.log("randomize");
    setIsLoading(true);
    const data = await getMeals();
    if (data !== undefined) {
      setIsLoading(false);
    }
    setMeals(data);
  };

  const eraseURL = () => {
    history.push("/MealPage/");
  };
  /*
/To Do : 
 Handle situation where Random is fetching to same "children" - no double meals

 CSS! Modify UI for better looks and UsExp. 
 
 Mobile ver. 
*/

  if (params.param) {
    console.log("erase " + loaded);
    eraseURL();
  }

  const errorMessage = (error) => {
    return (
      <div className={classes.errorMessage}>
        <p> {error}</p>
      </div>
    );
  };

  return (
    <div className={classes.mainCard}>
      <div className={classes.menuBar}>
        <div>
          <button onClick={fetchRandomMeals}> Random</button>
        </div>
        <div>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            id="ingredient"
            value={ingredient}
            onChange={(e) => {
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
      <div className={classes.mealCart}>
        {!isLoading && !isError && <MealList meals={meals} />}
        {isError && errorMessage(isError)}
        {isLoading && <LoadingSpiner />}
        {/* Add show error */}
      </div>
    </div>
  );
};

export default MealPage;
