import Link from 'curi-react/lib/Link';
import NProgress from 'nprogress';

// when the user clicks on one of the prefetch links, start the progress bar
const onClick = () => {
  NProgress.start();
}

const Nav = () => (
  <nav>
    <ul>
      <li><Link name='Home'>Home</Link></li>
      <li>
        <Link
          name='Album'
          params={{ id: 1 }}
          prefetch
          onClick={onClick}
        >
          Album 1
        </Link>
      </li>
      <li>
        <Link
          name='Album'
          params={{ id: 2 }}
          prefetch
          onClick={onClick}
        >
          Album 2
        </Link>
      </li>
      <li>
        <Link
          name='Album'
          params={{ id: 3 }}
          prefetch
          onClick={onClick}
        >
          Album 3
        </Link>
      </li>
      <li>
        <Link
          name='Album'
          params={{ id: 4 }}
          prefetch
          onClick={onClick}
        >
          Album 4
        </Link>
      </li>
      <li>
        <Link
          name='Album'
          params={{ id: 5 }}
          prefetch
          onClick={onClick}
        >
          Album 5
        </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
