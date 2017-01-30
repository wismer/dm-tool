import * as React from 'react';
import { connect } from 'react-redux';
import { Encounter } from '../interfaces';
import { Col } from 'react-bootstrap';

function EncounterContainer(props: Encounter) {
  return (
    <Col xs={12}>

    </Col>
  );
}

const EncounterComponent = connect()(EncounterContainer);
export default EncounterComponent;
