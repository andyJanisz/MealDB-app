import classes from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div>
      <div className={classes.description}>
        <p>
          This is simple react app that is using TheMealDB API:
          https://www.themealdb.com/api.php Here you have random meals that are
          fetched from API. You can also search for meal in serch bar, list them
          by category or ingredient.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
