import { ingLister, filterByIngredient } from "../MealDB/MealDB";
import { useEffect, useState } from "react";
import MealList from "../Meals/MealList";

const ByIngridientPage = () => {
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
    fetchByIng();
  }, [ingredient]);

  const fetchIng = async () => {
    const data = await ingLister();
    setIngList(data);
  };

  return (
    <>
      <div> Select an ingredient: </div>
      <div>
        <select
          id="category"
          value={ingredient}
          onChange={(e) => setIng(e.target.value)}
          onBlur={(e) => setIng(e.target.value)}
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
