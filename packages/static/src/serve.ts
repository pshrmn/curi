import express from "express";
import InMemory from "@hickory/in-memory";
import { curi } from "@curi/router";

// types
import { RouteDescriptor, RouterOptions, Emitted } from "@curi/router";

export interface ServeConfiguration {
  routes: Array<RouteDescriptor>;
  render: (emitted: Emitted) => string;
  insert: (markup: string, emitted: Emitted) => string;
  ready: () => Promise<any>;
  routerOptions?: RouterOptions;
  port?: string;
  doNotRenderRedirects?: boolean;
}

export default function serve(config: ServeConfiguration) {
  const app = express();

  app.get("*", function(req, res) {
    const history = InMemory({
      locations: [req.url]
    });

    const router = curi(history, config.routes, config.routerOptions);
    router.once((emitted: Emitted) => {
      let markup;
      let status;

      if (config.doNotRenderRedirects && emitted.response.redirectTo) {
        markup = "Redirecting...";
        status = emitted.response.status || 302;
      } else {
        markup = config.render(emitted);
        status = emitted.response.status || 200;
      }

      res.status(status).send(config.insert(markup, emitted));
    });
  });

  const server = app.listen(config.port || "8000", () => {
    config.ready().then(() => {
      server.close();
    });
  });
}
