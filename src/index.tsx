import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import DMMenu from './components/DMMenu';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import EncounterList from './components/EncounterList';
import MainMenu from './components/MainMenu';
import * as api from './api';
import SpellSearch from './components/SpellSearch';
import CharacterView from './components/CharacterView';
import EncounterDetail from './components/EncounterDetail';
import EncounterCreation from './components/EncounterCreation';
import {
  logger,
} from './middlewares';

const store = createStore(reducers, applyMiddleware(logger, thunkMiddleware));


function Main(props: any) {
  return <div className='container-fluid main'>{props.children}</div>;
}

function AppContainer() {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute components={{sidebar: MainMenu, main: Main}} />
          <Route path='/dm-tools' components={{sidebar: DMMenu, main: Main}}>
            <Route path='/dm-tools/encounters/' component={EncounterList} />
            <Route path='/dm-tools/encounters/:id/' getComponent={(prevState: Router.RouterState, cb?: any) => {
              api.getEncounters(prevState.params).then((data: string) => {
                store.dispatch({ type: 'ENCOUNTER_DETAIL_LOAD', encounter: JSON.parse(data) });
                cb(null, EncounterDetail);
              });
            }} />
            <Route path='/dm-tools/create-encounter/' component={EncounterCreation} />
            <Route path='/dm-tools/characters/' component={CharacterView} />
            <Route path='/dm-tools/spells/' component={SpellSearch} />
          </Route>
        </Route>
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
