import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import MainNavigation from "./shared/navigation/MainNavigation";
import Cities from './cities/pages/Cities';
import AddCity from './cities/pages/AddCity';
import EditCity from "./cities/pages/EditCity";
import Authenticate from "./users/pages/Authenticate";

import { AuthContextProvider } from "./shared/context/AuthContextProvider";
import { useAuthContext } from "./shared/context/auth-context";

import './App.css';

const queryClient = new QueryClient();

function AppContent() {
  const { token } = useAuthContext();

  let routes;
  
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Cities />
        </Route>
        <Route path="/cities/new" exact>
          <AddCity />
        </Route>
        <Route path="/cities/edit/:id" component={EditCity} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Cities />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Router>
      <MainNavigation />
      <main>{routes}</main>
    </Router>
  );

}

function App() {
  return (
    <AuthContextProvider> 
      <QueryClientProvider client={queryClient}>  
          <AppContent />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;