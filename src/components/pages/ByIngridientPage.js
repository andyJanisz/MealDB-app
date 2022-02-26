import { ingLister, filterByIngredient } from "../MealDB/MealDB";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import MealList from "../Meals/MealList";

const ByIngridientPage = () => {
  const history = useHistory();
  const params = useParams();

  const [ingList, setIngList] = useState([
    { idIngredient: "1", strIngredient: "Chicken" },
  ]);
  const [meals, setMeals] = useState([]);
  const [ingredient, setIng] = useState("");

  useEffect(() => {
    const fetchByIng = async () => {
      const data = await filterByIngredient(ingredient);
      if (ingredient.length === 0) return;
      return setMeals(data);
    };
    if (ingredient === "") {
      console.log("fetching...");
      fetchIng();
    }
    if (params.param) {
      setIng(params.param);
    }
    fetchByIng();
  }, [ingredient, params]);

  const fetchIng = async () => {
    const data = await ingLister();
    setIngList(data);
  };
  const changeURL = () => {
    history.push("/ingredients/");
  };
  return (
    <>
      <div> Select an ingredient: </div>
      <div>
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
