import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const [search, setSearch] = useState("");
  let history = useHistory();
  const searchHandler = () => {
    history.push(`/search/q=${search}`);
  };

  return (
    <header className={classes.header}>
      <NavLink to="/home" activeClassName={classes.active}>
        <div className={classes.logo}> MealDB Recepies </div>
      </NavLink>
      <nav className={classes.nav}>
        <ul>
          <li>
            <form onSubmit={searchHandler}>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for a meal"
              />
            </form>
          </li>
          <li>
            <NavLink to="/categories" activeClassName={classes.active}>
              By category
            </NavLink>
          </li>
          <li>
            <NavLink to="/ingredients" activeClassName={classes.active}>
              By ingridient
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
