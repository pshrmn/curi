import data from "./data";

// prefilter the data
let categories = {};
let products = {};
{
  data.forEach(d => {
    let { category, id } = d;
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
