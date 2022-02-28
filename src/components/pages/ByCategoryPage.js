import { categoryList, filterByCategory } from "../MealDB/MealDB";
import { useEffect, useState } from "react";
import MealList from "../Meals/MealList";
import classes from "./ByCategoryPage.module.css";

const SortByCategory = () => {
  const [catList, setCatList] = useState([{ strCategory: "Beef" }]);
  const [meals, setMeals] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchByCategory = async () => {
      const data = await filterByCategory(category);
      if (category.length === 0) return;
      return setMeals(data);
    };
    if (category === "") {
      console.log("fetching...");
      fetchCategories();
    }
    fetchByCategory();
    if (category === "") {
      setCategory("Dessert");
    }
  }, [category]);

  const fetchCategories = async () => {
    const data = await categoryList();
    setCatList(data);
  };

  return (
    <>
      <div className={classes.selText}> Select a category: </div>
      <div className={classes.selector}>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onBlur={(e) => setCategory(e.target.value)}
        >
          <option />
          {catList.map((cat) => (
            <option value={cat.strCategory} key={cat.strCategory}>
              {cat.strCategory}
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

export default SortByCategory;
