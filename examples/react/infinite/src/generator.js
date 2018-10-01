import loremIpsum from "lorem-ipsum";

const articles = {};

function generate(id) {
  if (!id) {
    id = Math.random()
      .toString(16)
      .slice(2, 8);
  }
  const title = loremIpsum({
    count: 4,
    units: "words"
  });
  const content = loremIpsum({
    count: 15,
    units: "paragraphs",
    sentenceLowerBoundary: 5,
    sentenceUpperBoundary: 10,
    format: "html"
  });
  const next = Math.random()
    .toString(16)
    .slice(2, 8);
  const article = { id, title, content, next };
  articles[id] = article;
  return article;
}

export default function generator(id) {
  return articles[id] || generate(id);
}
