import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/pages/HomePage";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import MealDetail from "./components/Meals/MealDetail";
import NotAvailable from "./components/pages/404";

const SearchPage = React.lazy(() => import("./components/pages/SearchPage"));
const ByIngridientPage = React.lazy(() =>
  import("./components/pages/ByIngridientPage")
);
const SortByCategory = React.lazy(() =>
  import("./components/pages/ByCategoryPage")
);

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
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
          <Route path="*">
            <NotAvailable />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
