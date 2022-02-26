import classes from "./Ingredient.module.css";

const Ingredient = ({ ingredient }) => {
  return (
    <div className={classes.container}>
      <img
        className={classes.imgIng}
        src={ingredient.img}
        alt={ingredient.name}
      />
      <p className={classes.name}>
        <span>{ingredient.name}</span>
      </p>
      <p>
        <span>Amount : {ingredient.measure}</span>
      </p>
    </div>
  );
};

export default Ingredient;
