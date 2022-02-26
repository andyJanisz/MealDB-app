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
  let tmp_meals = [];
  while (tmp_meals.length !== 12) {
    let result = await fetch(`${tmdb}random.php`);
    let data = await result.json();

    let isEmpty = !!tmp_meals.find(
      (meal) => JSON.stringify(meal) === JSON.stringify(data.meals[0])
    );
    if (!isEmpty) {
      tmp_meals.push(data.meals[0]);
    }
  }
  return tmp_meals;
};

const getIngredientImg = (ingredient) => {
  let imgThumbnail = `${tmbd_img}/${ingredient}.png`;
  return imgThumbnail;
};

const ingLister = async () => {
  const result = await fetch(`${tmdb}list.php?i=list`);
  const data = await result.json();
  return data.meals;
};

const filterByIngredient = async (ingredientName) => {
  const result = await fetch(`${tmdb}filter.php?i=${ingredientName}`);
  const data = await result.json();
  return data.meals;
};
const categoryList = async () => {
  const result = await fetch(`${tmdb}list.php?c=list`);
  const data = await result.json();
  return data.meals;
};
const filterByCategory = async (categorytName) => {
  const result = await fetch(`${tmdb}filter.php?c=${categorytName}`);
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
