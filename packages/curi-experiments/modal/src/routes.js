import Home from './components/Home';
import Product from './components/Product';
import Detail from './components/Detail';

export default [
  {
    name: 'Home',
    path: '',
    value: Home
  },
  {
    name: 'Product',
    path: 'paint/:color',
    value: Product,
    children: [
      {
        name: 'Product Detail',
        path: 'detail',
        value: Detail
      }
    ]
  }
]