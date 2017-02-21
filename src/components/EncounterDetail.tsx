import * as React from 'react';
import { encounterViewDispatch } from '../redux/dispatchers';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Jumbotron,
  Button,
  Panel,
  Col,
} from 'react-bootstrap';
// import CharacterList from './CharacterList';
import {
  Encounter,
  CharacterState,
  AppState,
} from '../interfaces';
// import { CharacterMap } from '../util';
/*
  1. hook up props
  2. hook up dispatchers (end turn, next turn, etc)
  3. ???
  4. hook up the router?
*/

type DetailState = {
  activeIdx: number;
};

function encounterDetailProps(state: AppState, prevProps?: any): Encounter {
  if (prevProps.params && prevProps.params.id) {
    let encounter = state.tools.encounters.find(e => `${e.id}` === prevProps.params.id);
    if (encounter) {
      return encounter;
    }
  }
  return state.tools.encounters[0];
}


interface EncounterView extends Encounter {
  nextTurn: () => void;
  alterHitPoints: (hp: number, charStateID: number, encounterID: number) => void;
  id: number;
  endRound: (id: number, endOfRound: boolean) => void;
}
//
// function CharacterStateDetail(props: CharacterStateProps) {
//   return (
//     <div className='char-detail'>
//       {/* character detail */}
//     </div>
//   );
// }

class EncounterDetail extends React.Component<EncounterView, DetailState> {
  constructor() {
    super();
    this.state = {
      activeIdx: 0
    };
  }

  nextTurn() {
    let activeIdx = this.state.activeIdx + 1;
    if (activeIdx >= this.props.roster.length) {
      activeIdx = 0;
      this.props.endRound(this.props.id, true);
      // POST req to server, updates redux state at resolution
    } else {
      this.props.endRound(this.props.id, false);
    }


    this.setState((prevState: DetailState, props: EncounterView): DetailState => {
      return { activeIdx };
    });
  }

  render() {
    return <EncounterDetailContainer
      {...this.props}
      alterHitPoints={(hp: number, charStateID: number, encounterID: number) => this.props.alterHitPoints(hp, charStateID, encounterID)}
      activeIdx={this.state.activeIdx}
      nextTurn={() => this.nextTurn()}
    />;
  }
}

function EncounterDetailContainer(props: EncounterView & DetailState) {
  let e =
    <Jumbotron>
      <h1>{props.name}</h1>
      <Button bsStyle='success'>
        Add Characters to the Encounter
      </Button>
    </Jumbotron>
  // const currentChar = props.roster[props.activeIdx];
  // const roster = CharacterMap(props.roster).slice(props.activeIdx);
  //

  let roster = props.roster.map((c: CharacterState) => {
    return (
      <div className='char-state'>
        <Col>{c.name}</Col>
        <Col>{c.currentHitPoints}</Col>
      </div>
    );
  });
  return (
    <div>
      {props.roster.length === 0 ? e : ''}
      <Panel>
        {roster}
      </Panel>
      <Button onClick={props.nextTurn}>
        Next Turn
      </Button>
    </div>
  );
}
// {/*
//   <Row><CharacterList characters={roster.prev} activeIdx={-1} /></Row>
//   <Row>
//     <CharacterList characters={roster.current} activeIdx={0}>
//       <Row>
//         <Button onClick={() => props.alterHitPoints(-1, currentChar.id || 0, props.id)}>-</Button>
//         <Button onClick={() => props.alterHitPoints( 1, currentChar.id || 0, props.id)}>+</Button>
//       </Row>
//     </CharacterList>
//   </Row>
//   <Row><CharacterList characters={roster.next} activeIdx={-1}/></Row>*/}

export default withRouter(connect(encounterDetailProps, encounterViewDispatch)(EncounterDetail));
