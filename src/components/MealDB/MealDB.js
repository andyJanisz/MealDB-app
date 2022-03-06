const tmdb = "https://www.themealdb.com/api/json/v1/1/";
const tmbd_img = "https://www.themealdb.com/images/ingredients";

// randomMeal: `${tmdb}random.php`,
// ingredients: `${tmdb}list.php?i=list`,
// categories: `${tmdb}list.php?c=list`,
// mealDetails: `${tmdb}lookup.php?i=`,
// filterByIngredient: `${tmdb}filter.php?i=`,

const searchMeal = async (meal) => {
  const res = await fetch(`${tmdb}search.php?s=${meal}`);
  const data = await res.json();
  return data.meals;
};

const mealDetails = async (id) => {
  const res = await fetch(`${tmdb}lookup.php?i=${id}`);
  const data = await res.json();
  return data;
};

const getMeals = async () => {
  const calbacks$ = Array.from({ length: 12 }, () =>
    fetch(`${tmdb}random.php`)
  );
  try {
    const data = await Promise.all(calbacks$);
    const meals = await Promise.all(data.map(async (d) => d.json()));
    return meals.map((meal) => meal.meals[0]);
  } catch {
    throw new Error("Error while fetching random meals!");
  }
};

const getIngredientImg = (ingredient) => {
  let imgThumbnail = `${tmbd_img}/${ingredient}.png`;
  return imgThumbnail;
};

const ingLister = async () => {
  const result = await fetch(`${tmdb}list.php?i=list`);
  if (!result.ok) {
    throw new Error("Error fetching while creating ingridient list!");
  }
  const data = await result.json();
  return data.meals;
};

const filterByIngredient = async (ingredientName) => {
  console.log(ingredientName);
  const result = await fetch(`${tmdb}filter.php?i=${ingredientName}`);
  if (!result.ok) {
    throw new Error("Error fetching while filtering by ingridient!");
  }
  const data = await result.json();
  return data.meals;
};
const categoryList = async () => {
  const result = await fetch(`${tmdb}list.php?c=list`);
  if (!result.ok) {
    throw new Error("Error fetching while creating category list!");
  }
  const data = await result.json();
  return data.meals;
};
const filterByCategory = async (categorytName) => {
  const result = await fetch(`${tmdb}filter.php?c=${categorytName}`);
  if (!result.ok) {
    throw new Error("Error fetching while filtering meals by category!");
  }
  const data = await result.json();
  return data.meals;
};

export {
  searchMeal,
  getMeals,
  mealDetails,
  getIngredientImg,
  ingLister,
  filterByIngredient,
  filterByCategory,
  categoryList,
};
