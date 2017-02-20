import * as React from 'react';
import { Link } from 'react-router';
import {
  Nav,
} from 'react-bootstrap';

const DMMenu = (props: any) => {
  return (
    <Nav bsStyle="pills" stacked>
      <li role='presentation'>
        <Link to='dm-tools/create-encounter/'>Create Encounter</Link>
      </li>
      <li role='presentation'>
        <Link to='dm-tools/spells/'>Spellbook</Link>
      </li>
      <li role='presentation'>
        <Link to='dm-tools/characters/'>Characters</Link>
      </li>
    </Nav>
  );
};

export default DMMenu;
