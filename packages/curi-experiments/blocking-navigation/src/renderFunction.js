import Nav from './components/Nav';

function render(response) {
  const { body:Body } = response;
  return (
    <div>
      <Nav />
      <Body />
    </div>
  );
}

export default render;
