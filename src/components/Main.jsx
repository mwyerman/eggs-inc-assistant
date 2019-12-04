import React from 'react';
import { Switch, Route } from 'react-router-dom';

import EpicResearch from './epic-research/EpicResearch';
import ContractCalculator from './contract-calculator/ContractCalculator';
import MysticalEggs from './mystical-eggs/MysticalEggs';
import Home from './Home';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/epic-research" component={EpicResearch} />
      <Route path="/contract-calculator" component={ContractCalculator} />
      <Route path="/mystical-eggs" component={MysticalEggs} />
    </Switch>
  </main>
);

export default Main;
