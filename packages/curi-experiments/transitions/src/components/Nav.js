import { Link } from 'curi-react';

const Nav = () => (
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li>
        <Link name='Contact'>Contact</Link>
        <ol>
          <li><Link name='Method' params={{ method: 'phone' }}>By Phone</Link></li>
          <li><Link name='Method' params={{ method: 'email' }}>By Email</Link></li>
          <li><Link name='Method' params={{ method: 'mail' }}>By Mail</Link></li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default Nav;
