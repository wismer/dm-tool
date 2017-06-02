import * as React from 'react';
import { SettingProps, AppState } from '../interfaces';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { saveChapterDispatchers } from '../redux/dispatchers';
import {
  Button,
  Header,
  Form,
  // Dropdown,
  Input,
  // List,
  TextArea,
  Grid,
  // Step,
  // Divider,
  // Rail,
  Container,
  Segment
} from 'semantic-ui-react'

class Setting extends React.Component<{onSubmit: (payload: any) => void} & SettingProps, undefined> {
  render() {
    alert(this.props.currentStep);
    const { onSubmit, chapterID } = this.props;
    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const title: HTMLInputElement = form.elements[0] as HTMLInputElement;
      const description = form.elements[1] as HTMLTextAreaElement;
      let payload = {
        title: title.value,
        description: description.value
      };

      onSubmit(payload);
    };
    // this is probably NOT CORRECT WAY
    if (this.props.currentStep === 1) {
      return <Redirect to={`/storyboard/${chapterID}/points-of-interest`} from='/storyboard/new' />
    }
    return (
      <Container>
        <Header as='h1'>Story Setting</Header>

        <Grid>
          <Grid.Column>
            <Segment>
              <Form onSubmit={handleSubmit}>
                <Form.Field name='title' control={Input} label="Setting Title" />
                <Form.Field name='description' label="Setting Description" control={TextArea} />
                <Button type='submit'>Create</Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

function props(state: AppState): SettingProps {
  const { currentStep, chapters } = state.storyboard;
  return {
    currentStep: currentStep,
    chapterID: currentStep > 0 ? chapters[chapters.length - 1] : undefined
  };
}

const Settings: React.ComponentClass<any> = connect(props, saveChapterDispatchers)(Setting);
export default withRouter(Settings);
