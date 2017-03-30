# uri-conf

```js
import { URIConf, uri, path } from 'uri-conf';
import { createBrowserHistory } from 'history';

const uris = [
  uri('Home', path('', { end: true })),
  uri('About', path('about')),
  uri('FAQ', path('faq'), [ uri('SpecFAQ', path(':question')) ])
];

const history = createBrowserHistory();
const conf = URIConf(history, uris);

conf.subscribe((info) => {
  
});
```
