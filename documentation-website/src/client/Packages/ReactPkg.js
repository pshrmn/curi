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
import { Section, Subsection } from '../components/Sections';

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
      <Section
        title={<Cmp>Navigator</Cmp>}
        id='Navigator'
      >
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

        <Section
          tag='h3'
          title='Props'
          id='Navigator-props'
        >

          <Subsection
            tag='h4'
            title='config'
            id='Navigator-config'
          >
            <p>
              A configuration object (created by calling curi's createConfig function).
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='render'
            id='Navigator-render'
          >
            <p>
              A render function. This will be called whenever the <Cmp>Navigator</Cmp>
              {' '}renders. The function will be passed the current response object and the config object it
              was passed as a prop. The function must return a React element.
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='response'
            id='Navigator-response'
          >
            <p>
              A response object. You can pass your <Cmp>Navigator</Cmp> a response object and
              it will use that instead of subscribing to the configuration object. This is ideal for server-side
              rendering.
            </p>
          </Subsection>
        </Section>
      </Section>

      <Section
        title={<Cmp>Link</Cmp>}
        id='Link'
      >
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

        <Section
          tag='h3'
          title='Props'
          id='Link-props'
        >

          <Subsection
            tag='h4'
            title='to'
            id='Link-to'
          >
            <p>
              The name of the route that you want to navigate to.
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='params'
            id='Link-params'
          >
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
          </Subsection>

          <Subsection
            tag='h4'
            title='details'
            id='Link-details'
          >
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
          </Subsection>

          <Subsection
            tag='h4'
            title='anchor'
            id='Link-anchor'
          >
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
          </Subsection>

          <Subsection
            tag='h4'
            title='active'
            id='Link-active'
          >
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
          </Subsection>
        </Section>
      </Section>

      <Section
        title={<Cmp>Active</Cmp>}
        id='Active'
      >
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

        <Section
          tag='h3'
          title='Props'
          id='Active-props'
        >

          <Subsection
            tag='h4'
            title='name'
            id='Active-name'
          >
            <p>
              The name of the route to compare against the response object.
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='params'
            id='Active-params'
          >  
            <p>
              An object containing route parameters. These will be compared against the route params of the
              response object.
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='children'
            id='Active-children'
          >
            <p>
              A React element that will have its props updated when the <Cmp>Active</Cmp>
              {' '}component is "active".
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='merge'
            id='Active-merge'
          >
            <p>
              A function that will modify the children element's props. It receives a props object as its
              argument and must return a props object.
            </p>
          </Subsection>

          <Subsection
            tag='h4'
            title='partial'
            id='Active-partial'
          >
            <p>
              A boolean that defaults to false. When it is true, the "active" check will check the response's partials
              array in addition to its name. This allows you to style ancestor routes of the actually "active" route.
            </p>
          </Subsection>
        </Section>

        <Section
          tag='h3'
          title='Usage'
          id='Active-usage'
        >

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
        </Section>
      </Section>

      <Section
        title={<Cmp>Block</Cmp>}
        id='Block'
      >
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

        <Section
          tag='h3'
          title='Props'
          id='Block-props'
        >

          <Subsection
            tag='h4'
            title='active'
            id='Block-active'
          >
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
          </Subsection>

          <Subsection
            tag='h4'
            title='confirm'
            id='Block-confirm'
          >
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
          </Subsection>
        </Section>
      </Section>

      <Section
        title={<IJS>curious()</IJS>}
        id='curious'
      >
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


        <Section
          tag='h3'
          title='Props'
          id='curious-props'
        >

          <Subsection
            tag='h4'
            title='internalRef'
            id='curious-internalRef'
          >
            <p>
              A ref function that you can use to access the wrapped component.
            </p>
            <PrismBlock lang='jsx'>
              {
`const WrappedComponent = curious(MyComponent);

<WrappedComponent internalRef={node => ref = node} />`
              }
            </PrismBlock>
          </Subsection>

          <Subsection
            tag='h4'
            title='Other Props'
            id='curious-other-props'
          >
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
          </Subsection>
        </Section>
      </Section>
    </APIBlock>
  </BasePackage>
);
