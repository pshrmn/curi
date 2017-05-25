import Nav from './components/Nav';
import NotFound from './components/NotFound';

export default function renderFunction(h, resp) {
  if (!resp) {
    return h('not-found');
  }
  const cmp = resp.body || NotFound;
  return h('div', [
    h(Nav),
    h(cmp, { props: { params: resp.params } })
  ]);
}
