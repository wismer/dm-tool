import * as React from 'react';
import { withRouter, Redirect, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import * as POIList from './ClueField';
import { combineRelated } from '../util';
import {
  Container,
  Form,
  // Rail,
  Grid,
  Input,
  Segment,
  // Icon,
  FormDropdownProps,
  Button,
} from 'semantic-ui-react';
import {
  ABILITIES_SKILLS,
  DC_OPTIONS,
} from '../constants';
import { abilityCheckDispatchers } from '../redux/dispatchers';
import {
  Characteristics,
  // ChapterUpdate,
  OutcomeModel,
  ClueModel,
  ClueField,
  // ClueResource,
  AppState,
  ChapterModel
} from '../interfaces';

const skillsOptions = ABILITIES_SKILLS.map(item => {
  return { key: item.toLowerCase(), value: item.toLowerCase(), text: item };
});


// type ClueResourceProps = {
//   onClick: (index: number) => void
//   clue: ClueResource;
// };


// function ClueComponent(props: ClueResourceProps) {
//   const { clue } = props;
//   const outcomes = clue.outcomes.map(outcome => {
//     return (
//       <List.Item key={outcome.value}>
//         <List.Content>
//           <List.Header>{outcome.value}+</List.Header>
//           <List.Description>{outcome.description}</List.Description>
//         </List.Content>
//       </List.Item>
//     )
//   });
//   const stats = clue.requiredStats.map(s => <Label>{s}</Label>);
//   return (
//     <div>
//       <Accordion.Title>
//         <Icon name='dropdown' />
//         {clue.description} <span className='stat-blocks'>{stats}</span>
//       </Accordion.Title>
//       <Accordion.Content>
//         <List>
//           {outcomes}
//         </List>
//       </Accordion.Content>
//     </div>
//   );
//   // return (
//   //   <List.Item onClick={() => onClick(clue)}>
//   //     <Icon name='dropdown' />
//   //     <List.Header>
//   //       {clue.description} <span className='stat-blocks'>{stats}</span>
//   //     </List.Header>
//   //     <List.Content>
//   //       <List>
//   //         {outcomes}
//   //       </List>
//   //     </List.Content>
//   //   </List.Item>
//   // );
// }
//
// interface OutcomeDisplay extends Outcome {
//   label: string;
//   dc: number;
// }

// interface OutcomeProps {
//   outcome: OutcomeDisplay;
//   onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void;
// }


// function OutcomeFieldComponent(props: OutcomeProps) {
//   const { description, dc, label } = props.outcome;
//
//   return (
//     <Form.Field>
//       <label>{label}</label>
//       <Input value={description} name={name} onChange={props.onChange.bind(null, dc)} />
//     </Form.Field>
//   );
// }

interface POIProps {
  onSubmit: (chapterID: string, clue: ClueField) => void;
  onUpdate: (clue: ClueModel) => void;
  fetchDetail: (chapterID: number | string) => void;
};

interface POIWrappedProps extends RouteComponentProps<any> {
  chapter: ChapterModel;
  chapterID: string;
  clues: ClueModel[];
  outcomes: OutcomeModel[];
}

// type OutcomeFieldProps = {
//   description: string;
//   name: string;
//   value: number;
// };

type POIState = {
  characteristics: Characteristics;
  activeClue: number;
  description: string;
  clues: ClueField[]; // this needs to go TODO
  currentOutcomes: string[];
};

export function OutcomeFields() {
  const dcs = DC_OPTIONS
    .map(dc => <Form.Field name={`characteristic[${dc.name}]`} control={Input} key={dc.key} label={dc.text} placeholder={dc.text} />);

  return <div>{dcs}</div>;
}


class POI extends React.Component<POIWrappedProps & POIProps, POIState> {
  state = {
    characteristics: [],
    clues: [],
    activeClue: -1,
    description: '',
    currentOutcomes: ['', '', '', '', '', '']
  };

  componentDidMount() {
    this.props.fetchDetail(this.props.chapterID);
  }

  onChangeOutcome(e: React.SyntheticEvent<HTMLInputElement>, index: number) {
    const currentOutcomes = this.state.currentOutcomes.slice();
    const description = e.currentTarget.value;
    currentOutcomes[index] = description;
    this.setState({ currentOutcomes });
  }

  onDeleteClue(e: React.SyntheticEvent<HTMLDivElement>) {
    
  }

  onChangeDescription(e: React.SyntheticEvent<HTMLInputElement>) {
    this.setState({ description: e.currentTarget.value });
  }

  onCharacteristicChange(e: React.SyntheticEvent<Element>, data: FormDropdownProps) {
    this.setState({ characteristics: data.value as Characteristics });
  }

  componentWillReceiveProps(incoming: POIWrappedProps & POIProps) {
    const incomingClues = incoming.clues;
    const currentClues = this.props.clues;
    if (typeof incoming.chapter === 'undefined') return;

    if (incomingClues.length > currentClues.length && currentClues.length > 0) {
      this.setState({ activeClue: incomingClues.length - 1 });
    } else {
      this.setState({ activeClue: -1 });
    }
  }

  onSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    let { characteristics: requiredStats, description, activeClue } = this.state;
    const currentClue = this.props.clues[activeClue];
    if (currentClue) {
      let clue: ClueModel = {
        outcomes: [],
        requiredStats,
        description,
        created: currentClue.created,
        chapter: currentClue.chapter,
        id: currentClue.id,
        modified: currentClue.modified,
      };
      this.props.onUpdate(clue);
    } else {
      let clue: ClueField = {
        outcomes: [],
        requiredStats,
        description,
      };
      this.props.onSubmit(this.props.chapterID.toString(), clue);
    }

    e.currentTarget.reset();
  }

  prefillForm(e: React.SyntheticEvent<Element>, idx: number) {
    const { activeClue: prevClueIdx } = this.state;
    const { clues, outcomes } = this.props;
    const prevClue = clues[prevClueIdx];
    const nextClue = clues[idx];
    if (prevClueIdx === idx) {
      this.setState({ description: '', activeClue: -1, currentOutcomes: ['', '', '', '', '', ''] });
      return;
    }
    if (nextClue && !prevClue) {
      // a clue was expanded without there being an active one,
      // so the state gets set to that
      this.setState({
        activeClue: idx,
        description: nextClue.description,
        currentOutcomes: combineRelated<ClueModel, string, OutcomeModel>(nextClue, 'outcomes', 'description', outcomes)
      });
    } else if (!nextClue) {
      console.log('expect there NOT to be a next clue, but a prev does exist?');
      // the clue was collapsed, so reset the state, but keep the description?
      this.setState({
        activeClue: -1,
        description: prevClue.description,
        currentOutcomes: combineRelated<ClueModel, string, OutcomeModel>(prevClue, 'outcomes', 'description', outcomes)
      });
    } else if ((prevClue && nextClue) && (nextClue.id === prevClue.id)) {
      console.log('both clues exist?');
      const description = idx > -1 ? nextClue.description : '';

      this.setState({
        activeClue: prevClue.id === nextClue.id ? -1 : nextClue.id,
        description: description,
        currentOutcomes: combineRelated<ClueModel, string, OutcomeModel>(nextClue, 'outcomes', 'description', outcomes)
      });
    } else {
      debugger
    }
  }

  render() {
    const { chapterID, chapter, clues } = this.props;
    let { activeClue, currentOutcomes, description } = this.state;
    let characteristics: Characteristics = this.state.characteristics.slice();
    if (!chapterID) return <Redirect to='/storyboard' />
    let dcs: any[] = [];

    const outcomeFields = currentOutcomes.map((v, i) => {
      const option = DC_OPTIONS[i];
      return (
        <Form.Field key={i}>
          <label>{option.text}</label>
          <Input
            value={v}
            placeholder={option.text}
            name={option.name}
            onChange={e => this.onChangeOutcome(e, i)} />
        </Form.Field>
      );
    });
    if (chapter && chapter.clues) {
      dcs = clues;
      // dcs = clues.map(c => <ClueComponent key={c.id} clue={c} onClick={this.prefillForm.bind(this)} />);
      // dcs = clues.map((c, i) => {
      //   const clueOutcomes = c.outcomes.map(id => {
      //     let outcome = outcomes.find(o => o.id === id);
      //     return outcome ? <OutcomeComponent description={outcome.description} value={outcome.dc} /> : null;
      //   });
      //   const stats = c.requiredStats.map(r => <Label key={r}>{r}</Label>);
      //   const title = (
      //     <div style={{display: 'inline'}}>
      //       {c.description} <span className='stat-blocks'>{stats}</span>
      //     </div>
      //   );
      //   return { title, content: <List>{clueOutcomes}</List>, key: `panel-${i}` };
      // });
    }


    if (activeClue !== -1) {
      const clue = clues[activeClue];
      description = clue.description;
      characteristics = characteristics.concat(clue.requiredStats);
    }


    return (
      <Container>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <Form onSubmit={this.onSubmit.bind(this)}>
                  <Form.Field
                    onChange={this.onChangeDescription.bind(this)}
                    label='Description'
                    name='description'
                    value={description}
                    control={Input} />

                  <Form.Field>
                    <Form.Dropdown
                      label='Select Abilities and Skills'
                      placeholder='Select all that apply'
                      fluid
                      multiple
                      selection
                      value={characteristics}
                      onChange={this.onCharacteristicChange.bind(this)}
                      options={skillsOptions} />
                  </Form.Field>
                  {activeClue > -1 ? outcomeFields : null}
                  <Button color='green' type='submit'>Submit</Button>
                  <Button color='red' floated='right' onClick={this.onDeleteClue.bind(this)}>Delete</Button>
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <POIList.ClueListPanel
                  activeIdx={activeClue}
                  clues={clues}
                  outcomes={this.props.outcomes}
                  onTitleClick={this.prefillForm.bind(this)}
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              I don't know.
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

const POIComponent: React.ComponentClass<any> = connect((state: AppState, prevProps: RouteComponentProps<any>): POIWrappedProps => {
  console.log('POI ComponentClass is rendering with', state.storyboard);
  const { chaptersById, cluesById, outcomesById } = state.storyboard;
  const chapter = chaptersById[prevProps.match.params['chapter_id']];
  let clues: ClueModel[] = [];
  let outcomes: OutcomeModel[] = [];
  if (chapter) {
    let outcomeIDs: number[] = [];
    clues = chapter.clues.map(id => cluesById[id]);
    clues.forEach(clue => {
      outcomeIDs = outcomeIDs.concat(clue.outcomes);
    });
    outcomes   = outcomeIDs.map(id => outcomesById[id]);
  }
  return {
    chapterID: prevProps.match.params['chapter_id'],
    outcomes,
    chapter,
    clues,
    ...prevProps
  };
}, abilityCheckDispatchers)(POI);
export const PointsOfInterest = withRouter(POIComponent);
