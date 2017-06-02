import * as React from 'react';
import { OutcomeCollection, ClueModel, OutcomeResource } from '../interfaces';
import {
  Form,
  Accordion,
  Input,
  Label,
  List,
} from 'semantic-ui-react';

type OutcomeFieldProps = {
  text: string;
  value: number;
  name: string;
  i: number;
  onChangeOutcome: (e: React.SyntheticEvent<HTMLInputElement>, i: number) => void;
};

export function OutcomeField(props: OutcomeFieldProps) {
  const { i, name, onChangeOutcome, value, text } = props;
  return (
    <Form.Field key={value}>
      <label>{text}</label>
      <Input
        value={value}
        placeholder={text}
        name={name}
        onChange={e => onChangeOutcome(e, i)} />
    </Form.Field>
  );
}

type TitleProps = {
  children?: React.ReactChildren;
  stats: string[];
  key: number | string;
};
const Title = (props: TitleProps) => {
  const { stats, children } = props;

  return (
    <div style={{display: 'inline'}}>
      {children}
      <span className='stat-blocks'>
        {stats.map(stat => <Label key={stat}>{stat}</Label>)}
      </span>
    </div>
  );
}


export function OutcomeListItem(outcome: OutcomeResource) {
  return (
    <List.Item key={outcome.dc}>
      <List.Content>
        <List.Header>{outcome.dc}+</List.Header>
        <List.Description>{outcome.description}</List.Description>
      </List.Content>
    </List.Item>
  );
}

type ClueItemList = {
  clues: ClueModel[];
  outcomes: OutcomeCollection;
  activeIdx: number;
  onTitleClick: (e: React.MouseEvent<HTMLDivElement>, index: number | number[]) => void;
};

// list of clues
export function ClueListPanel(props: ClueItemList) {
  const { activeIdx, clues, outcomes } = props;
  const panels = clues.map((item, index) => {
    let { description, requiredStats } = item;
    let outcomeObjects: JSX.Element[] = [];
    if (activeIdx === index) {
      outcomeObjects = item.outcomes
        .map(id => outcomes[id])
        .map(outcome => <OutcomeListItem {...outcome} />);
    }
    return {
      content: <List>{outcomeObjects}</List>, // list of outcomes
      title: <Title key={index} stats={requiredStats}>{description}</Title>, // clue description
      key: `panel-${item.id}`,
    };
  });
  return (
    <Accordion activeIndex={activeIdx} panels={panels} onTitleClick={props.onTitleClick} />
  );
}
