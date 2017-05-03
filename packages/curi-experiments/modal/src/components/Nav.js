import { Link } from 'curi-react';

const Nav = () => (
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li>
        <Link name='Contact'>Contact</Link>
        <ol>
          <li>
            <Link
              name='Method'
              params={{ method: 'phone' }}
              to={{ state: { modal: true } }}
            >
              By Phone
            </Link>
          </li>
          <li>
            <Link
              name='Method'
              params={{ method: 'email' }}
              to={{ state: { modal: true } }}
            >
              By Email
            </Link>
          </li>
          <li>
            <Link
              name='Method'
              params={{ method: 'mail' }}
              to={{ state: { modal: true } }}
            >
              By Mail
            </Link>
          </li>
          <li>
            <Link
              name='Method'
              params={{ method: 'something else' }}
              to={{ state: { modal: true } }}
            >
              By Something Else
            </Link>
          </li>
        </ol>
      </li>
    </ul>
  </nav>
);

export default Nav;
