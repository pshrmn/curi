import dataCache from "./dataCache";

let WIDTHS = [100, 150, 200];
let HEIGHTS = [100, 200];
let COLORS = ["IndianRed", "MediumSeaGreen", "Moccasin", "Teal", "YellowGreen"];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomImages() {
  let images = [];
  for (let i = 0; i < 10; i++) {
    images.push({
      width: random(WIDTHS),
      height: random(HEIGHTS),
      color: random(COLORS)
    });
  }
  return images;
}

export default function fakeAPI(id) {
  return new Promise((resolve, reject) => {
    // use cached data if it exists
    let existing = dataCache.get(id);
    if (existing) {
      resolve(existing);
      return;
    }
    // otherwise simulate loading time between 0-500ms,
    // generate data, cache, and resolve
    setTimeout(() => {
      let imgs = randomImages();
      dataCache.set(id, imgs);
      resolve(imgs);
    }, Math.random() * 500);
  });
}
