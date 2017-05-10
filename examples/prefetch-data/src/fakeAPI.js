const WIDTHS = [100, 150, 200];
const HEIGHTS = [100, 200];
const COLORS = ['IndianRed', 'MediumSeaGreen', 'Moccasin', 'Teal', 'YellowGreen'];

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomImages() {
  const images = [];
  for (let i=0; i<10; i++) {
    images.push({
      width: random(WIDTHS),
      height: random(HEIGHTS),
      color: random(COLORS)
    });
  }
  return images;
}

export default function fakeAPI() {
  return new Promise((resolve, reject) => {
    // simulate loading time between 0-500ms
    setTimeout(() => {
      resolve(randomImages());
    }, Math.random()*500);
  });
}
