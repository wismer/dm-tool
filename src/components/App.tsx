import * as React from "react";
import { connect } from 'react-redux';
import { AppState } from '../interfaces';



function raceProps(state: AppState): any  {
  return state;
}

  const ApplicationContainer = (props: any) => {
  return (
    <div id='dungeons-and-dragons'>
      {props.children}
    </div>
  );
}

export const App = connect(raceProps)(ApplicationContainer);
