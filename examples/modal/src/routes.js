import Home from './components/Home';
import Product from './components/Product';
import Detail from './components/Detail';

export default [
  {
    name: 'Home',
    path: '',
    body: () => Home
  },
  {
    name: 'Product',
    path: 'paint/:color',
    body: () => Product,
    children: [
      {
        name: 'Product Detail',
        path: 'detail',
        body: () => Detail
      }
    ]
  }
]