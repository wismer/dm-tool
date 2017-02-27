import * as React from 'react';
import { connect } from 'react-redux';
import { CreateCharacterProps, CreateCharacterState } from '../interfaces';
import { addCharacterDispatch } from '../redux/dispatchers';
import {
  Form,
  FormGroup,
  FormControl,
  Col,
  ControlLabel,
  Button,
  Glyphicon,
  Checkbox,
  Panel
} from 'react-bootstrap';


//FIXME
function addCharacterProps(s: any, props: any): CreateCharacterProps {
  return { isOpen: false, saveCharacter: props.saveCharacter };
}

class AddCharacterContainer extends React.Component<CreateCharacterProps, CreateCharacterState> {
  constructor() {
    super();
    this.state = {
      character: {
        playerName: '',
        characterName: '',
        id: 0,
        armorClass: 8,
        toHit: 2,
        passiveWisdom: 8,
        initiative: 8,
        maxHitPoints: 8,
        isNpc: false
      },
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps: { isOpen: boolean }) {
    if (!nextProps.isOpen) {
      this.setState({
        character: {
          playerName: '',
          characterName: '',
          id: 0,
          armorClass: 8,
          toHit: 2,
          passiveWisdom: 8,
          initiative: 8,
          maxHitPoints: 8,
          isNpc: false
        }
      });
    }
  }

  handleChange(e: any) {
    const character = this.state.character;
    if (e.target.id === 'isNpc') {
      character.isNpc = !character.isNpc;
      this.setState({ character });
    } else {
      character[e.target.id] = e.target.value;
      this.setState({ character });
    }
  }

  render() {
    const { character } = this.state;
    return (
      <Panel header='Create Character'>
        <Form horizontal>
          <FormGroup controlId='playerName'>
            <Col componentClass={ControlLabel} sm={4}>
              Player's Name
            </Col>
            <Col sm={8}>
              <FormControl onChange={this.handleChange} value={character.playerName} type="text" placeholder="Player's Name" />
            </Col>
          </FormGroup>
          <FormGroup controlId='characterName'>
            <Col componentClass={ControlLabel} sm={4}>
              Characters's Name
            </Col>

            <Col sm={8}>
              <FormControl onChange={this.handleChange} value={character.characterName} type="text" placeholder="Characters Name" />
            </Col>
          </FormGroup>
          <FormGroup controlId='armorClass'>
            <Col componentClass={ControlLabel} sm={4}>
              AC
            </Col>

            <Col sm={4}>
              <FormControl onChange={this.handleChange} value={character.armorClass} type="number" placeholder="AC" />
            </Col>
          </FormGroup>
          <FormGroup controlId='toHit'>
            <Col componentClass={ControlLabel} sm={4}>
              To Hit
            </Col>

            <Col sm={4}>
              <FormControl onChange={this.handleChange} value={character.toHit} type="text" placeholder="To Hit" />
            </Col>
          </FormGroup>
          <FormGroup controlId='passiveWisdom'>
            <Col componentClass={ControlLabel} sm={4}>
              Passive Wisdom (perception)
            </Col>

            <Col sm={4}>
              <FormControl onChange={this.handleChange} value={character.passiveWisdom} type="text" placeholder="Passive Wisdom" />
            </Col>
          </FormGroup>
          <FormGroup controlId='initiative'>
            <Col componentClass={ControlLabel} sm={4}>
              Initiative
            </Col>

            <Col sm={4}>
              <FormControl onChange={this.handleChange} value={character.initiative} type="text" placeholder="Initiative" />
            </Col>
          </FormGroup>

          <FormGroup controlId='maxHitPoints'>
            <Col componentClass={ControlLabel} sm={4}>
              Max Hit Points (HP)
            </Col>

            <Col sm={4}>
              <FormControl onChange={this.handleChange} value={character.maxHitPoints} type="text" placeholder="Hit Points" />
            </Col>
          </FormGroup>

          <FormGroup controlId='isNpc'>
            <Col componentClass={ControlLabel} sm={4}>
              NPC?
            </Col>

            <Col sm={8}>
              <Checkbox onChange={this.handleChange} inline id='isNpc' />
            </Col>
          </FormGroup>

          <Button bsStyle='success' onClick={() => this.props.saveCharacter(this.state.character)} block>
            <Glyphicon glyph='plus' />
          </Button>
        </Form>
      </Panel>
    );
  }
}

const AddCharacterModal = connect(addCharacterProps, addCharacterDispatch)(AddCharacterContainer);
export default AddCharacterModal;
