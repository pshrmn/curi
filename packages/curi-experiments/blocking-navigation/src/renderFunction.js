import Nav from './components/Nav';

function render(response) {
  const { body:Body } = response;
  console.log('rerendering');
  return (
    <div>
      <Nav />
      <Body />
    </div>
  );
}

export default render;
