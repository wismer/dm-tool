import * as React from 'react';
import {
  Panel,
} from 'react-bootstrap';
import { MenuOptions } from '../interfaces';
import { Link, withRouter } from 'react-router';


// function NavLink(props: any) {
//   return (
//     <li role='presentation'>
//       <Link activeClassName='active' to='/dm-tools/encounters/'>
//         Encounters
//       </Link>
//     </li>
//   );
// }

class MainMenu extends React.Component<any, {active: MenuOptions}> {
  constructor() {
    super();
    this.state = { active: MenuOptions.None };
  }

  changeView(active: MenuOptions) {
    this.setState({ active });
  }

  render() {
    return (
      <Panel>
        <ul className='nav nav-pills nav-stacked'>
          <li role='presentation'>
            <Link activeClassName='active' to='/dm-tools/encounters/'>
              Encounters
            </Link>
          </li>
          <Link activeClassName='active' to='/dm-tools/spells/'>
            Spell Lookup
          </Link>
        </ul>
      </Panel>
    );
  }
}

export default withRouter(MainMenu);;
