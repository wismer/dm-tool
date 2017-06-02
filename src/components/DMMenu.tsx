import * as React from 'react';
import { Menu } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';

// import {
//   Nav,
// } from 'react-bootstrap';
//
// const DMMenu = (props: any) => {
//   return (
//     <Nav bsStyle="pills" stacked>
//       <li role='presentation'>
//         <Link to='dm-tools/create-encounter/'>Create Encounter</Link>
//       </li>
//       <li role='presentation'>
//         <Link to='dm-tools/spells/'>Spellbook</Link>
//       </li>
//       <li role='presentation'>
//         <Link to='dm-tools/characters/'>Characters</Link>
//       </li>
//     </Nav>
//   );
// };


function MenuBar(props: { loc: string }) {

  return (
    <Menu>
      <Menu.Item key='spells' name='Spell List' active={props.loc.includes('/spells')} />
      <Menu.Item key='encounters' name='Encounters' active={props.loc.includes('/encounters')} />
      <Menu.Item key='storyboard' name='Storyboard' active={props.loc.includes('/storyboard')} />
      <Menu.Item key='characters' name='Characters' active={props.loc.includes('/characters')} />
    </Menu>
  );
}

export default MenuBar;
