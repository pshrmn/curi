import React from 'react';
import BasePackage from '../components/BasePackage';
import {
  PrismBlock,
  InlineJS as IJS,
  InlineComponent as Cmp
} from '../components/PrismBlocks';
import { Note, Warning } from '../components/Messages';
import APIBlock from '../components/APIBlock';
import { Link } from '@curi/react';

export default ({ name, version, globalName }) => (
  <BasePackage
    name={name}
    version={version}
    globalName={globalName}
    about={(
      <div>
        <p>
          The <IJS>@curi/react</IJS> provides a number of React components that you can use
          for rendering your application.
        </p>
      </div>
    )}
  >
    <APIBlock>
      <div id='Navigator'>
        <h2>
          <Cmp>Navigator</Cmp>
          <Link className='header-link' details={{ hash: 'Navigator' }}>#</Link>
        </h2>
        <p>
          The <Cmp>Navigator</Cmp> component provides a way to automatically re-render your
          application when the location changes. This component gets passed a Curi configuration
          object, which it will subscribe to so that it can re-render when the location changes.
        </p>
        <PrismBlock lang='javascript'>
          {
`import { Navigator } from '@curi/react';`
          }
        </PrismBlock>

        <p>
          
        </p>

        <PrismBlock lang='jsx'>
          {
`const config = createConfig(history, routes);

ReactDOM.render((
  <Navigator config={config}>
    {(response, config) => {
      if (!response) {
        return null;
      }
      return response.body ? <response.body /> : null;
    }}
  </Navigator>
), holder);`
          }
        </PrismBlock>

        <div className='section'>
          <h3>props</h3>

          <div className='subsection'>
            <h4>config</h4>
            <p>
              A configuration object (created by calling curi's createConfig function).
            </p>
          </div>

          <div className='subsection'>
            <h4>children</h4>
            <p>
              A render function. This will be called whenever the <Cmp>Navigator</Cmp>
              {' '}renders. The function will be passed the current response object and the config object it
              was passed as a prop. The function must return a React element.
            </p>
          </div>

          <div className='subsection'>
            <h4>response</h4>
            <p>
              A response object. You can pass your <Cmp>Navigator</Cmp> a response object and
              it will use that instead of subscribing to the configuration object. This is ideal for server-side
              rendering.
            </p>
          </div>
        </div>
      </div>

      <div id='Link'>
        <h2>
          <Cmp>Link</Cmp>
          <Link className='header-link' details={{ hash: 'Link' }}>#</Link>
        </h2>
        <p>
          A <Cmp>Link</Cmp> allows you to navigate within your application using an anchor
          element (<Cmp>a</Cmp>). When the rendered element is clicked, instead of reloading the page it will
          use your configuration object's history object to navigate.
        </p>
        <PrismBlock lang='javascript'>
          {
`import { Link } from '@curi/react';`
          }
        </PrismBlock>

        <p>
          With the <Cmp>Link</Cmp>, instead of providing a URI to navigate to, you just need to specify
          the name of the route you want to link to. Then, the pathname of the URI you want the
          component to link to will be automatically generated for you.
        </p>

        <PrismBlock lang='javascript'>
          {
`<Link to='User' params={{ id: 16 }}>User 16</Link>
// <a href='/user/16'>User 16</a>`
          }
        </PrismBlock>

        <div className='section'>
          <h3>props</h3>

          <div className='subsection'>
            <h4>to</h4>
            <p>
              The name of the route that you want to navigate to.
            </p>
          </div>

          <div className='subsection'>
            <h4>params</h4>
            <p>
              If the route that you want to navigate to (or any of its parents) include path parameters,
              you can specify them using the params prop.
            </p>
            <PrismBlock lang='javascript'>
            {
`// User route is { name: 'User', path: '/user/:id' }
<Link to='User' params={{ id: 16 }}>User 16</Link>`
              }
            </PrismBlock>
          </div>

          <div className='subsection'>
            <h4>details</h4>
            <p>
              While the pathname of the location to navigate to will be generated for you, this does not
              cover over location properties (query, hash, and state). You can provide these values using
              the details prop.
            </p>
            <PrismBlock lang='javascript'>
              {
`<Link
  to='Products'
  params={{ type: 'vacuums' }}
  details={{ hash: 'iroomba' }}
>
  DJ Roomba
</Link>`
              }
            </PrismBlock>
            <Note>
              You can also include a pathname property in the details object and it will overwrite the one
              generated from the to prop. This isn't recommended, but does work.
            </Note>
          </div>

          <div className='subsection'>
            <h4>anchor</h4>
            <p>
              By default, when you render a <Cmp>Link</Cmp>, an anchor element will be
              rendered (<IJS>React.createElement('a', ...)</IJS>). However, you can provide your
              own component to be rendered instead. This can be useful for using styled components to
              navigate.
            </p>
            <Warning>
              You can provide any component that you want, but you <em>should</em> stick with an anchor
              (or a component that renders an anchor). There are accessibility issues that will occur when
              you use other DOM elements as links. The component's prop type is func in an attempt to
              discourage you from making your link render a button, div, span, etc.
            </Warning>
          </div>

          <div className='subsection'>
            <h4>active</h4>
            <p>
              The active prop gives you an opportunity to style the element rendered by the{' '}
              <Cmp>Link</Cmp> when it is "active". Being active means that the{' '}
              <Cmp>Link</Cmp>'s route parameters are the same as the current response's
              route parameters. This <strong>does not</strong> take into account any query parameters or
              the hash.
            </p>
            <p>
              The active prop is an object with two properties. The first one, merge is required. The merge
              property must be a function. That function's argument is the props object that will be passed
              used to render the element rendered by the <Cmp>Link</Cmp>. The merge
              function can modify these props however it likes. It must return the resulting props object.
            </p>
            <PrismBlock lang='javascript'>
              {
`function mergeActive(props) {
  props.className = 'active';
  return props;
}

<Link to='Home' active={{ merge: mergeActive }}>Home</Link>`
              }
            </PrismBlock>
            <p>
              The second property of the active object is partial. By default, only{' '}
              <Cmp>Link</Cmp>s that match the response object's name can be considered
              "active". However, when partial is true, any parent routes can also be "active". This is
              done using the response object's partials property.
            </p>
            <PrismBlock lang='javascript'>
              {
`<Link to='Users' active={{ partial: true, merge: mergeActive }}>Users</Link>`
              }
            </PrismBlock>
            <Note>
              If you use the active prop, you have to include the{' '}
              <Link to='Package' params={{ package: 'addon-active' }}>@curi/addon-active</Link> addon
              in your Curi configuration object. If you do not, an error will be thrown.
            </Note>
          </div>
        </div>
      </div>

      <div id='Redirect'>
        <h2>
          <Cmp>Redirect</Cmp>
          <Link className='header-link' details={{ hash: 'Redirect' }}>#</Link>
        </h2>
        <p>
          The <Cmp>Redirect</Cmp> component lets you "render" a redirect. After
          the <Cmp>Redirect</Cmp> component has mounted, it will call the appropriate
          history method to navigate to a new location.
        </p>
        <PrismBlock lang='javascript'>
          {
`import { Redirect } from '@curi/react';`
          }
        </PrismBlock>

        <p>
          <Cmp>Redirect</Cmp> works very similarly to a <Cmp>Link</Cmp>,
          except instead of having navigation triggered by a click, with a <Cmp>Redirect</Cmp>
          {' '}the navigation will happen automatically just by rendering the component.
        </p>
        <PrismBlock lang='jsx'>
          {
`<Redirect to='Home' />`
          }
        </PrismBlock>

        <div className='section'>
          <h3>props</h3>

          <div className='subsection'>
            <h4>to</h4>
            <p>
              The name of the route that should be used to generate the pathname of the location to navigate to.
            </p>
          </div>

          <div className='subsection'>
            <h4>params</h4>
            <p>
              Any path params of the route specified with the to prop (or the params for any of its ancestor
              routes).
            </p>
          </div>

          <div className='subsection'>
            <h4>details</h4>
            <p>
              Additional location properties to include when generating the URI to redirect to (search, hash, state).
            </p>
          </div>

          <div className='subsection'>
            <h4>children</h4>
            <p>
              You can provide a children element that will be rendered until the response generated by the redirect
              has resolved. This allows you to render some sort of "loading" message, which can be useful if the
              redirect takes a bit of time and you don't want to just render a blank page.
            </p>
          </div>
        </div>
      </div>

      <div id='Active'>
        <h2>
          <Cmp>Active</Cmp>
          <Link className='header-link' details={{ hash: 'Active' }}>#</Link>
        </h2>
        <p>
          The <Cmp>Active</Cmp> component allows you to style its child component as "active" when
          the location that <Cmp>Active</Cmp> describe matches the current location.
        </p>
        <PrismBlock lang='javascript'>
          {
  `import { Active } from '@curi/react';`
          }
        </PrismBlock>

        <p>
          The <Cmp>Active</Cmp> component lets you modify its children element's props.
          It takes a merge function as a prop, which you can use to modify the child element's props when
          the component is "active".
        </p>

        <div className='section'>
          <h4>props</h4>

          <div className='subsection'>
            <h5>name</h5>
            <p>
              The name of the route to compare against the response object.
            </p>
          </div>

          <div className='subsection'>
            <h5>params</h5>
            <p>
              An object containing route parameters. These will be compared against the route params of the
              response object.
            </p>
          </div>

          <div className='subsection'>
            <h5>children</h5>
            <p>
              A React element that will have its props updated when the <Cmp>Active</Cmp>
              {' '}component is "active".
            </p>
          </div>

          <div className='subsection'>
            <h5>merge</h5>
            <p>
              A function that will modify the children element's props. It receives a props object as its
              argument and must return a props object.
            </p>
          </div>

          <div className='subsection'>
            <h5>partial</h5>
            <p>
              A boolean that defaults to false. When it is true, the "active" check will check the response's partials
              array in addition to its name. This allows you to style ancestor routes of the actually "active" route.
            </p>
          </div>
        </div>

        <div className='section'>
          <h3>Usage</h3>

          <PrismBlock lang='jsx'>
            {
`function merge(props) {
  props.className = 'active';
  return props; 
}

const Users = (props) => (
  {
    props.users.map(u => (
      <Active
        key={u.id}
        name='User'
        merge={merge}
        params={u}
      >
        <User {...u} />
      </Active>
    ))
  }
);`
            }
          </PrismBlock>

          <p>
            This relies on the active addon from{' '}
            <Link to='Package' params={{ package: 'addon-active' }}>@curi/addon-active</Link> being
            added to your configuration object.
          </p>

          <PrismBlock lang='javascript'>
            {
`import createActiveAddon from '@curi/active-addon';

const config = createConfig(history, routes, {
  addons: [createActiveAddon]
});`
            }
          </PrismBlock>

          <p>
            While not strictly a requirement, the <Cmp>Active</Cmp> relies on the{' '}
            <IJS>curi</IJS> and <IJS>curiResponse</IJS> context variables existing,
            so your application should have a{' '}
            <Link
              to='Package'
              params={{ package: 'react' }}
              details={{ hash: 'Navigator' }}
            ><Cmp>Navigator</Cmp></Link> as an ancestor of your <Cmp>Active</Cmp>
            components in order to ensure that those exist.
          </p>
        </div>

      </div>

      <div id='Block'>
        <h2>
          <Cmp>Block</Cmp>
          <Link className='header-link' details={{ hash: 'Block' }}>#</Link>
        </h2>
        <p>
          The <Cmp>Block</Cmp> component lets you prevent navigation until a user
          has confirmed that they want to navigate. This can be useful when the user attempts to navigate
          away from a partially filled form. This <strong>will not</strong> prevent the user from navigating
          to another site, it only works for navigation within the application.
        </p>
        <PrismBlock lang='javascript'>
          {
`import { Block } from '@curi/react';`
          }
        </PrismBlock>

        <div className='section'>
          <h3>props</h3>

          <div className='subsection'>
            <h4>active</h4>
            <p>
              A boolean, which is true by default. When it is true, the navigation block is active. When
              it is false, navigation will not be blocked.
            </p>
            <PrismBlock lang='jsx'>
              {
`// will block navigation
<Block active={true} confirm={confirm} />

// will not block navigation
<Block active={false} confirm={confirm} />`
              }
            </PrismBlock>
          </div>

          <div className='subsection'>
            <h4>confirm</h4>
            <p>
              The confirm prop is a function that will be called whenever there is navigation. The
              function will receive four arguments: location, action, success, and failure. The location
              and action values are the location object that is being navigated to and the type of
              navigation. The success and failure arguments are functions that you should call depending
              on whether or not you want to let the navigation happen. When the navigation should occur,
              the confirm function should call the success function. When the navigation should be
              cancelled, the failure function should be called.
            </p>
            <PrismBlock lang='jsx'>
              {
`<Block
  confirm={({ location, action }, success, failure) => {
    const response = window.confirm("Shall we?");
    if (response) {
      success();
    } else {
      failure();
    }
  }}
/>`
              }
            </PrismBlock>
          </div>
        </div>
      </div>

      <div id='curious'>
        <h2>
          <IJS>curious()</IJS>
          <Link className='header-link' details={{ hash: 'curious' }}>#</Link>
        </h2>
        <PrismBlock lang='javascript'>
          {
`import { curious } from '@curi/react';`
          }
        </PrismBlock>

        <PrismBlock lang='javascript'>
          {
`class MyComponent extends React.Component {
  render() {
    // because this component is wrapped with curious,
    // you can access this.props.curi and
    // this.props.response
  }
}

export default curious(MyComponent);`
          }
        </PrismBlock>


        <div className='section'>
          <h3>props</h3>

          <div className='subsection'>
            <h4>internalRef</h4>
            <p>
              A ref function that you can use to access the wrapped component.
            </p>
            <PrismBlock lang='jsx'>
              {
`const WrappedComponent = curious(MyComponent);

<WrappedComponent internalRef={node => ref = node} />`
              }
            </PrismBlock>
          </div>

          <div className='subsection'>
            <h4>Other props</h4>
            <p>
              Any other props that you pass to the wrapped component will be available to the
              base component.
            </p>

            <PrismBlock lang='jsx'>
              {
`const WrappedComponent = curious(MyComponent);

<WrappedComponent one='two' red='blue' />
// MyComponent's props: { curi: {...}, response: {...}, one: 'two', red: 'blue' }`
              }
            </PrismBlock>
          </div>
        </div>
      </div>

    </APIBlock>
  </BasePackage>
);
