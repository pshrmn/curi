import React from "react";

import generator from "../generator";
import Article from "./Article";

export default class InfiniteArticleScroll extends React.Component {
  constructor(props) {
    super(props);
    const next = generator();
    this.state = {
      articles: [props.response.params.id, next.id],
      index: 0,
      loaded: 0
    };

    this.queue = [];
  }

  observe = target => {
    if (this.observer) {
      this.observer.observe(target);
    } else {
      this.queue.push(target);
    }
  };

  render() {
    return this.state.articles.map(id => (
      <Article key={id} id={id} observe={this.observe} />
    ));
  }

  componentDidMount() {
    let initial = true;
    let queued = null;
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        // ignore the initial call (after adding the first entries)
        // because we don't need to navigate
        if (initial) {
          initial = false;
          return;
        }
        const { articles, index } = this.state;
        const activeArticle = articles[index];

        entries.forEach(entry => {
          const id = entry.target.getAttribute("id");
          // navigation happens when the active article is no longer visible
          if (id === activeArticle) {
            if (queued) {
              const nextIndex = articles.findIndex(a => a === queued);
              this.setState({ index: nextIndex });

              if (nextIndex < index) {
                // pop back to the existing article
                this.props.router.history.go(-1);
              } else {
                if (nextIndex > this.state.loaded) {
                  // push to the new article
                  this.props.router.navigate({
                    name: "Article",
                    params: { id: queued }
                  });
                  // generate the next article and increment the number of loaded articles
                  // so we know when to push/pop
                  this.setState(prevState => ({
                    articles: [...prevState.articles, generator().id],
                    loaded: prevState.loaded + 1
                  }));
                } else {
                  // pop forward to the existing article
                  this.props.router.history.go(1);
                }
              }
              queued = null;
            } else {
              console.warn("No article queued to navigate to.");
            }
          } else {
            // If the article isn't active, queue it to be the next article
            // This could potentially have issues with very short articles.
            if (entry.isIntersecting) {
              queued = id;
            }
          }
        });
      },
      {
        threshold: 0
      }
    );
    if (this.queue) {
      while (this.queue.length) {
        const target = this.queue.pop();
        this.observer.observe(target);
      }
    }
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
