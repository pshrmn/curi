export default function renderFunction(h, resp) {
  if (!resp) {
    return h('not-found');
  }
  const cmp = resp.body || 'not-found';
  return h('div', [
    h('app-nav'),
    h(cmp, { props: { params: resp.params } })
  ]);
}
