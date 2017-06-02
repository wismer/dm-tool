import * as React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { chapterListDispatchers } from '../redux/dispatchers';
import {
  ChapterModel,
  AppState,
} from '../interfaces';
/// <reference path='../../node_modules/@types/react-router/index.d.ts' />
import * as RR from 'react-router';
import {
  List,
} from 'semantic-ui-react';
type ChapterProps = { chapters: ChapterModel[] };

function chapterIndexProps(state: AppState): ChapterProps {
  const { chapters, chaptersById } = state.storyboard;
  return { chapters: chapters.map(id => chaptersById[id]) };
}

type ChapterDispatch = { fetchList: () => void };
type ChapterListProps = ChapterProps & ChapterDispatch;

class ChapterIndex extends React.Component<RR.RouteComponentProps<any> & ChapterListProps, undefined> {
  componentDidMount() {
    this.props.fetchList();
  }

  render() {
    const chapters = this.props.chapters.map((chapter, key) => {
      return <List.Item key={key}>{chapter.title}</List.Item>;
    });
    return (
      <div>
        <List>CHAPTER INDEX YO{chapters}</List>
      </div>
    );
  }
}

export default connect(chapterIndexProps, chapterListDispatchers)(ChapterIndex);
