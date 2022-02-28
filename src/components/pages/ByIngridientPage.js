import { ingLister, filterByIngredient } from "../MealDB/MealDB";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import MealList from "../Meals/MealList";
import classes from "./ByIngredientPage.module.css";

const ByIngridientPage = () => {
  const history = useHistory();
  const params = useParams();
  const [ingList, setIngList] = useState([
    { idIngredient: "1", strIngredient: "Chicken" },
  ]);
  const [meals, setMeals] = useState([]);
  const [ingredient, setIng] = useState("");
  const [fetchError, setfetchError] = useState();

  // fetchRandomMeals().catch((error) => {
  //   setfetchError(error.message);
  // });

  useEffect(() => {
    const fetchByIng = async () => {
      const data = await filterByIngredient(ingredient);
      if (ingredient.length === 0) return;
      if (data === null) return; // No meals ava. - can make whole error handling here...
      return setMeals(data);
    };
    if (ingredient === "") {
      console.log("fetching...");
      fetchIng().catch((error) => {
        setfetchError(error.message);
      });
    }
    if (params.param) {
      setIng(params.param);
    }
    fetchByIng().catch((error) => {
      setfetchError(error.message);
    });
    if (ingredient === "") {
      setIng("Beef");
    }
  }, [ingredient, params]);

  const fetchIng = async () => {
    const data = await ingLister();
    setIngList(data);
  };
  const changeURL = () => {
    history.push("/ingredients/");
  };

  if (fetchError) {
    return (
      <div className={classes.errorMessage}>
        <p> {fetchError}</p>
      </div>
    );
  }

  return (
    <>
      <div className={classes.selDesc}> Select an ingredient: </div>
      <div className={classes.selector}>
        <select
          id="category"
          value={ingredient}
          onChange={(e) => {
            setIng(e.target.value);
            changeURL();
          }}
          onBlur={(e) => {
            setIng(e.target.value);
            changeURL();
          }}
        >
          <option />
          {ingList.map((ing) => (
            <option value={ing.strIngredient} key={ing.idIngredient}>
              {ing.strIngredient}
            </option>
          ))}
        </select>
      </div>
      <div>
        <MealList meals={meals} />
      </div>
    </>
  );
};

export default ByIngridientPage;
