import React from 'react';
import BasePackage from '../components/BasePackage';
import { InlineJS, PrismBlock } from '../components/PrismBlocks';
import APIBlock from '../components/APIBlock';
import { Note, Warning } from '../components/Messages';
import { Link } from 'curi-react';

export default ({ name, version, globalName }) => (
  <BasePackage name={name} version={version} globalName={globalName}>
    <APIBlock>
    <h3>&lt;Link&gt;</h3>
      <PrismBlock lang='javascript'>
        {
`import Link from 'curi-react-link';`
        }
      </PrismBlock>

      <p>
        A <InlineJS>&lt;Link&gt;</InlineJS> allows you to navigate within your application using an anchor
        element (&lt;a&gtl;). When the rendered element is clicked, instead of reloading the page it will
        use your configuration object's history object to navigate.
      </p>

      <p>
        Instead of providing a URI to navigate to, you just need to specify the name of the route you want
        to link to. Then, the pathname of the URI you want the component to link to will be automatically
        generated for you.
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
            By default, when you render a <InlineJS>&lt;Link&gt;</InlineJS>, an anchor element will be
            rendered (<InlineJS>React.createElement('a', ...)</InlineJS>). However, you can provide your
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
            <InlineJS>&lt;Link&gt;</InlineJS> when it is "active". Being active means that the{' '}
            <InlineJS>&lt;Link&gt;</InlineJS>'s route parameters are the same as the current response's
            route parameters. This <strong>does not</strong> take into account any query parameters or
            the hash.
          </p>
          <p>
            The active prop is an object with two properties. The first one, merge is required. The merge
            property must be a function. That function's argument is the props object that will be passed
            used to render the element rendered by the <InlineJS>&lt;Link&gt;</InlineJS>. The merge
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
            <InlineJS>&lt;Link&gt;</InlineJS>s that match the response object's name can be considered
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
            <Link to='Package' params={{ package: 'curi-addon-active' }}>curi-addon-active</Link> addon
            in your Curi configuration object. If you do not, an error will be thrown.
          </Note>
        </div>
      </div>
    </APIBlock>
  </BasePackage>
);
