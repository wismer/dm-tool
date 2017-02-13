import { connect } from 'react-redux';
import * as React from 'react';
import { Link } from 'react-router';
import { Encounter, EncounterListProps } from '../interfaces';
import {
  ListGroup,
  // ListGroupItem,
  Col,
  PageHeader,
} from 'react-bootstrap';
import { withRouter } from 'react-router';
import { encounterListProps } from '../redux/reducers/tools';
import { encounterListDispatch } from '../redux/dispatchers';
/*
ENCOUNTER
  name - text
  surprise_round - checkbox

  option to add pre-existing characters...

  which needs...

  the current character list (like an option to ADD)
  then fields for the character state...
    initiative_roll -> number,
    was_surprised -> checkbox
    readied_action -> checkbox,
    current_hp -> character.maxHitPoints (default)
    conditions (TODO later)

  but that is optional.

  active panel, on click expands.

  sorted by date.
  <Encounter />
  <Encounter />
  <Encounter active />
  <Encounter />
  <Encounter />
  <Encounter />
  <Encounter />
*/


// FIXME yea yea I know this doesn't belong here.
interface EncounterDispatch {
  retrieveEncounterData: () => void;
}

type EncounterListState = { open?: boolean };
class EncounterListContainer extends React.Component<EncounterListProps & EncounterDispatch, EncounterListState> {
  constructor(props: EncounterListProps) {
    super(props);
    this.state = { open: false };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.retrieveEncounterData();
  }

  render() {
    return <EncounterList {...this.props} />;
  }
}

const EncounterList = (props: any) => {
  const encounters = props.encounters.map((e: Encounter, i: number) => {
    return (
      <Link to={`/dm-tools/encounters/${e.id}/`} key={i} className='list-group-item'>
        {e.name}
      </Link>
    );
  });
  return (
    <Col xs={12}>
      <PageHeader>ENCOUNTER LIST</PageHeader>
      <ListGroup>
        {encounters}
      </ListGroup>
    </Col>
  );
};

export default withRouter(connect(encounterListProps, encounterListDispatch)(EncounterListContainer));
