import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/pages/HomePage";
import SearchPage from "./components/pages/SearchPage";
import MealDetail from "./components/Meals/MealDetail";
import SortByCategory from "./components/pages/ByCategoryPage";
import ByIngridientPage from "./components/pages/ByIngridientPage";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomePage />
        </Route>
        <Route path="/meal/:id">
          <MealDetail />
        </Route>
        <Route path="/categories/">
          <SortByCategory />
        </Route>
        <Route path="/search/q=:param">
          <SearchPage />
        </Route>
        <Route path="/ingredients/">
          <ByIngridientPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
