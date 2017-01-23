import * as React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Grid, Button } from 'react-bootstrap';
import { AppState } from '../interfaces';



function raceProps<T>(state: AppState<T>): any  {
  return state;
}

  const ApplicationContainer = (props: any) => {
  return (
    <div id='dungeons-and-dragons'>
      CHARACTER CREATION HA HA
      <Grid>
        <Link to='/dm-tools'>
          <Button block>
            DM Tools
          </Button>
        </Link>
        <Button block>
          Create a Character
        </Button>
        {props.children}
      </Grid>
    </div>
  );
}

export const App = connect(raceProps)(ApplicationContainer);
