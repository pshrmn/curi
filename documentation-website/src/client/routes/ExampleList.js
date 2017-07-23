import ExampleList from '../route-components/ExampleList';
import exampleRoute from './Example';

export default {
  name: 'Examples',
  path: 'examples/',
  body: () => ExampleList,
  title: 'Examples',
  children: [exampleRoute]
};
