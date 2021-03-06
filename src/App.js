import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./components/pages/HomePage";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import MealDetail from "./components/Meals/MealDetail";
import NotAvailable from "./components/pages/404";
import MealPage from "./components/pages/MealPage";

const SearchPage = React.lazy(() => import("./components/pages/SearchPage"));

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
            <Redirect to="/MealPage/" />
          </Route>
          <Route path="/home" exact>
            <HomePage />
          </Route>
          <Route path="/meal/:id">
            <MealDetail />
          </Route>
          <Route path="/search/q=:param">
            <SearchPage />
          </Route>
          <Route path="/ingredients/:param">
            <MealPage />
          </Route>
          <Route path="/MealPage/" exact>
            <MealPage />
          </Route>
          <Route path="/MealPage/:param">
            <MealPage />
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
