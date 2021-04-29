import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';

// Home
export const homePath = '/';

const Routes = () => {
  return (
    <BrowserRouter>
      <Route>
        <Switch>
          <MainLayout>
            <Route path={homePath} exact component={Home} />
          </MainLayout>
        </Switch>
      </Route>
    </BrowserRouter>
  );
};

export default Routes;
