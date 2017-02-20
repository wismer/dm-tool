import { connect } from 'react-redux';
import * as React from 'react';
import { Link } from 'react-router';
import { Encounter, EncounterListProps } from '../interfaces';
import {
  ListGroup,
  ListGroupItem,
  Col,
  PageHeader,
  Pagination,
} from 'react-bootstrap';
import { withRouter } from 'react-router';
import { encounterListProps } from '../redux/reducers/encounter';
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
  retrieveEncounterData: <T, R>(location: T, params: R) => void;
}

type ListProps = EncounterListProps & EncounterDispatch;

type EncounterListState = { open?: boolean, activePage: number };
class EncounterListContainer extends React.Component<ListProps, EncounterListState> {
  constructor(props: EncounterListProps) {
    super(props);
    this.state = { open: false, activePage: 1 };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.retrieveEncounterData(this.props.location, this.props.params);
  }

  componentWillReceiveProps(nextProps: ListProps) {
    if (nextProps.activePage !== this.props.activePage) {
      this.fetchData();
    }
  }

  render() {
    return <EncounterList {...this.props} />;
  }
}

const EncounterList = (props: any) => {
  const encounters = props.encounters.map((e: Encounter, i: number) => {
    return (
      <ListGroupItem key={i} className='encounter-list'>
        <Link to={`/dm-tools/encounters/${e.id}/`}>
          <div className='encounter-list-name'>
            {e.name}
          </div>

          <div className='encounter-list-roster'>
            {e.roster.length}
          </div>

          <div className='encounter-list-created'>
            {e.created}
          </div>
        </Link>
      </ListGroupItem>
    );
  });
  return (
    <Col xs={12}>
      <PageHeader>ENCOUNTER LIST</PageHeader>
      <ListGroup>
        {encounters}
      </ListGroup>
      <Pagination items={props.maxPage} next prev activePage={props.activePage} onSelect={props.changePage} />
    </Col>
  );
};

export default withRouter(connect(encounterListProps, encounterListDispatch)(EncounterListContainer));
