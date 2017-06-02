import * as React from 'react';
import { Character, ClueField } from '../interfaces';
import { SAMPLE_CHARS } from '../constants';
import { Route } from 'react-router';
// import StorySetting from './components/StorySetting';
import StoryCreation from './StoryCreation';
// import ChapterIndex from './ChapterIndex';


interface NPCListProps {
  availableNpcs: Character[];
  showNpcList: boolean;
  showNpcCreator: boolean;
}

enum ClueFormStage {
  Closed,
  Skill,
  Outcome,
  Completed
}

interface StoryboardForm extends NPCListProps {
  setting: string;
  title: string;
  characterQuery: string;
  attachedNPCs: Character[];
  clues: ClueField[];
  clueFormState: ClueFormStage;
  currentClue: null | ClueField;
}

// interface OutcomeComponent {
//   onChange: () => void;
//   value: string;
//   key: string;
//   text: string;
// }
//
// function PossibleOutcome(props: OutcomeComponent) {
//   return (
//     <Form.Field name={`DC${props.value}`} label={props.text} control={Input} placeholder='Outcome' />
//   );
// }
//
// function Icon() {
//   return (
//     <i className='icon'>
//       <svg width="25px" height="25px" viewBox="0 0 100 100">
//         <use x="0" y="0" xlinkHref="#dice" />
//       </svg>
//     </i>
//   );
// }
//
//

export default class Storyboard extends React.Component<undefined, StoryboardForm> {
  constructor() {
    super();
    this.state = {
      setting: '',
      currentClue: null,
      characterQuery: '',
      title: '',
      showNpcList: false,
      showNpcCreator: false,
      availableNpcs: [],
      attachedNPCs: SAMPLE_CHARS.slice(),
      clues: [],
      clueFormState: ClueFormStage.Closed
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(input: HTMLInputElement) {
    const { name } = input;
    if (!name) return;
    const state = Object.assign({}, this.state, { [name]: input.value });
    this.setState(state);
  }

  addClue() {
    let { currentClue, clues } = this.state;

    if (currentClue) {
      clues = [...clues, currentClue];
    }

    this.setState(Object.assign({}, this.state, { currentClue: null, clues }));
  }

  handleAddNPC(form: HTMLFormElement) {
    const data = form.querySelector('input');
    if (data && data.value) {
      const character = Object.assign({}, SAMPLE_CHARS[0], {
        characterName: data.value });
      const state = Object.assign({}, this.state, {
        attachedNPCs: [...this.state.attachedNPCs, character]
      });
      this.setState(state);
      data.value = '';
    }
  }

  handleOpenClue() {
    this.setState(Object.assign({}, this.state, { clueFormState: ClueFormStage.Skill }))
  }

  handleSettingChange(e: HTMLTextAreaElement) {
    let state = Object.assign({}, this.state, { setting: e.value });
    this.setState(state);
  }

  handleToggleAction(key: string) {
    let state = this.state;
    if (key === 'npcs') {
      state = Object.assign({}, state, { showNpcList: !state.showNpcList, showNpcCreator: !state.showNpcCreator })
    }

    this.setState(state);
  }

  handleFormSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    // const form = new FormData(e.currentTarget);
  }

  render() {
    // const { characterQuery, currentClue, clues } = this.state;
    // const addedClues = clues.map(clue => <ClueComponent {...clue} />)
    //
    // const npcs = this.state.attachedNPCs
    //   .filter(c => new RegExp(characterQuery, 'i').test(c.characterName) && characterQuery)
    //   .map(c => <List.Item>{c.characterName}</List.Item>);
    // const abilityOptions = ABILITIES_SKILLS.map(c => {
    //   return { value: c, text: c, key: c.slice(0, 3).toLowerCase() };
    // });
    //
    // const currentAbilities = currentClue ? currentClue.ability : [];

    /*
      Setting Form
        Setting Name
        Setting Text
        Character List

      Add Character Form
    */

    return (
      <div>
        STORBYOARD
        <Route path='/storyboard/create/' component={StoryCreation}  />
      </div>
    );
  }
}
