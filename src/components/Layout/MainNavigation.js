import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const [search, setSearch] = useState("");
  const [isSidebar, setIsSidebar] = useState(false);
  let history = useHistory();

  const searchHandler = () => {
    history.push(`/search/q=${search}`);
  };

  const openSidebar = (isSidebar) => {
    return setIsSidebar(!isSidebar);
  };

  return (
    <header className={classes.header}>
      <div
        className={` ${classes.sidePanel} ${
          !isSidebar && classes.sidePanelOff
        }`}
      >
        <div
          className={classes.closebtn}
          onClick={() => {
            openSidebar(isSidebar);
          }}
        >
          &times;
        </div>

        <ul className={classes.navList}>
          <li>
            <NavLink to={`/Home/`} activeClassName={classes.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={`/MealPage/`} activeClassName={classes.active}>
              Meal Page
            </NavLink>
          </li>
          <li>
            <NavLink to={`/About/`} activeClassName={classes.active}>
              About
            </NavLink>
          </li>
        </ul>
      </div>
      <div
        className={` ${classes.cover} ${isSidebar && classes.coverON}`}
      ></div>

      <div
        className={classes.logo}
        onClick={() => {
          openSidebar(isSidebar);
        }}
      >
        <i class="fa fa-bars fa-2x"></i>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <form onSubmit={searchHandler}>
              <input
                className={classes.input}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search for a meal"
              />
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNavigation;
