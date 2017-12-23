import React from 'react';
import { Link } from '@curi/react';

import EXAMPLES from '../constants/examples';
import { Section } from './Sections';
import styleActive from '../utils/styleActive';

const Category = ({ name, examples }) => (
  <ul className='tiles'>
    {
      examples.map(example => (
        <li key={`${example.category}/${example.slug}`} className='tile'>
          <Link
            to='Example'
            params={{ category: example.category, slug: example.slug }}
            active={{ merge: styleActive }}
          >
            <h2>{example.name}</h2>
            <p className='description'>{example.description}</p>
          </Link>
        </li>
      ))
    }
  </ul>
)

export default () => {
  const examples = EXAMPLES.all();
  const categories = Object.keys(examples);
  return (
    <div>
      <ul>
        {
          categories.map(key => (
            <li key={key}>
              <Link details={{ hash: key }}>{key}</Link>
            </li>
          ))
        }
      </ul>
      {
        categories.map(key => (
          <Section
            title={key}
            id={key}
            key={key}
          >
            <Category name={key} examples={examples[key]} />
          </Section>
        ))
      }
    </div>
  );
}