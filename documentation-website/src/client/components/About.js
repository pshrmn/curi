import React from 'react';
import { Section } from './Sections';

export default ({ about }) => (
  <Section
    title='About'
    id='about'
  >
    {about}
  </Section>
);
