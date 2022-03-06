import { NavLink } from "react-router-dom";
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
        <NavLink
          to={`/Ingredients/${ingredient.name}`}
          activeClassName={classes.active}
        >
          <span>{ingredient.name}</span>
        </NavLink>
      </p>
      <p>
        <span>Amount : {ingredient.measure}</span>
      </p>
    </div>
  );
};

export default Ingredient;
