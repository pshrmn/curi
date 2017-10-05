import NotFound from './components/NotFound';

export default function renderFunction(h, resp) {
  if (!resp) {
    return h(null);
  }
  const cmp = resp.body || NotFound;
  return h('div', [
    h(cmp, { props: { params: resp.params, data: resp.data } })
  ]);
}
