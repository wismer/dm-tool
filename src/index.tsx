import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App';
import { createStore, applyMiddleware } from 'redux';
import MenuBar from './components/DMMenu';
import { Provider } from 'react-redux';
import reducers from './redux/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { Route, Switch } from 'react-router';
// import EncounterList from './components/EncounterList';
// import MainMenu from './components/MainMenu';
// import SpellSearch from './components/SpellSearch';
// import CharacterView from './components/CharacterView';
// import Storyboard from './components/Storyboard';
import StorySetting from './components/StorySetting';
import StoryCreation from './components/StoryCreation';
import ChapterIndex from './components/ChapterIndex';
import {PointsOfInterest, OutcomeFields} from './components/PointsOfInterest';
// import EncounterDetail from './components/EncounterDetail';
// import EncounterCreation from './components/EncounterCreation';

import {
  logger,
} from './middlewares';

// tslint:disable-next-line
const store = createStore(reducers, applyMiddleware(logger, thunkMiddleware));

export type Pathing = {
  path: string;
  component: any,
  routes?: Pathing[];
}
//
// const routes = [
//   {
//     path: '/',
//     component: App,
//     routes: [
//       {
//         path: '/storyboard',
//         component: Storyboard,
//         routes: [
//           {
//             path: '/storyboard/create/', component: StoryCreation, routes: [
//               { path: '/storyboard/create/setting', component: StorySetting },
//               // { path: '/storyboard/create/', component:  }
//             ]
//           },
//         ]
//       },
//     ]
//   }
// ];
//
// const RouteWithSubRoutes = (route: Pathing) => {
//   return (
//     <Route path={route.path} render={props => (
//       // pass the sub-routes down to keep nesting
//       <route.component {...props} routes={route.routes}/>
//     )}/>
//   );
// }

function AppContainer() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route render={props => <MenuBar loc={props.location.pathname} />} />
          <Route exact path='/' render={props => <App {...props} />} />
          <Route exact strict path='/storyboard' render={props => <ChapterIndex />} />
          <Switch>
            <Route path='/storyboard/new' component={StorySetting} />
            <Route path='/storyboard/:chapter_id/points-of-interest' component={PointsOfInterest} />
            <Switch>
              <Route path='/storyboard/:chapter_id/points-of-interest/:outcome_id' component={OutcomeFields} />
            </Switch>
          </Switch>
          <Route path='/storyboard/' strict render={props => <StoryCreation />} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
