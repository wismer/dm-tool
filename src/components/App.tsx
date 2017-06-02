import * as React from "react";
import { connect } from 'react-redux';
// import { Route } from 'react-router-dom';
// import ChapterIndex from './ChapterIndex';


const ApplicationContainer = (props: {children?: React.ReactNode}) => {
  return (
    <div id='dungeons-and-dragons'></div>
  );
}

export const App = connect()(ApplicationContainer);
