import data from "./data";

// prefilter the data
const categories = {};
const products = {};
{
  data.forEach(d => {
    const { category, id } = d;
    products[id] = d;
    if (categories[category]) {
      categories[category].push(d);
    } else {
      categories[category] = [d];
    }
  });
}

export default {
  categories: () => Object.keys(categories),
  category: c => categories[c],
  product: id => products[id]
};
