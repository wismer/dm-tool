import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import DMTools from './components/DMTools';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers/index';
import thunkMiddleware from 'redux-thunk';
import { Router, Route, hashHistory } from 'react-router';
import { retrieveEncounterData } from './redux/actions';
const store = createStore(reducers, applyMiddleware(thunkMiddleware));

function AppContainer() {
  return (
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <Route path='/dm-tools' component={DMTools} onEnter={() => {
            store.dispatch(retrieveEncounterData());
          }} />
        </Route>
      </Router>
    </Provider>
  );
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
