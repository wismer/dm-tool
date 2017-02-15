import * as React from "react";
import { connect } from 'react-redux';
import { AppState } from '../interfaces';


function raceProps(state: AppState): any  {
  return state;
}

const ApplicationContainer = (props: any) => {
  const { sidebar, main } = props;
  return (
    <div id='dungeons-and-dragons'>
      <div className='sidebar'>
        {sidebar}
      </div>

      {main}
    </div>
  );
}

export const App = connect(raceProps)(ApplicationContainer);
