import { Step } from 'semantic-ui-react';
import * as React from 'react';
import { connect } from 'react-redux';
import { SStep, AppState } from '../interfaces';

type SSteps = { steps: SStep [] };

function stepProps(state: AppState): SSteps {
  return { steps: state.storyboard.steps };
}

const Icon = () => {
  return (
    <i className='icon'>
      <svg width="25px" height="25px" viewBox="0 0 100 100">
        <use x="0" y="0" xlinkHref="#dice" />
      </svg>
    </i>
  );
};
function StoryStep(props: SSteps) {
  const steps = props.steps.map((step, i) => {
    return (
      <Step key={i} active={step.active}>
        <Icon />
        <Step.Content>
          <Step.Title>{step.title}</Step.Title>
          <Step.Description>{step.description}</Step.Description>
        </Step.Content>
      </Step>
    );
  });
  return (
    <Step.Group fluid>
      {steps}
    </Step.Group>
  );
}

export default connect(stepProps)(StoryStep);
