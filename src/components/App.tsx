import * as React from "react";
import { connect } from 'react-redux';
import { AppState } from '../interfaces';
import { Grid, Col } from 'react-bootstrap';


function raceProps(state: AppState): any  {
  return state;
}

const ApplicationContainer = (props: any) => {
  const { sidebar, main } = props;
  return (
    <Grid id='dungeons-and-dragons'>
      <Col className='sidebar' xs={2}>
        {sidebar}
      </Col>

      <Col className='main' xs={10}>
        {main}
      </Col>
    </Grid>
  );
}

export const App = connect(raceProps)(ApplicationContainer);
