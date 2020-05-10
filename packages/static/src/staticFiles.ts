import { outputFile } from "fs-extra";
import { join } from "path";
import { createRouter } from "@curi/router";
import { createReusable } from "@hickory/in-memory";

import pathnames from "./pathnames";

import { LocationOptions } from "@hickory/in-memory";
import { Emitted } from "@curi/types";
import { StaticConfiguration, Result } from "./types";

export default async function staticFiles(
  config: StaticConfiguration
): Promise<Result[]> {
  let {
    pages,
    router: { routes, options: routerOptions = {} },
    output: { render, dir },
    history: historyOptions
  } = config;

  // generate input pathname/output filename pairs
  // for the provided pages
  let io = pathnames({
    routes,
    pages
  }).map(pathname => {
    return {
      pathname,
      outputPath: join(dir, pathname, "index.html")
    };
  });

  // if there is a catch all page to be generated,
  // add it to the input/output array
  if (config.fallback) {
    let { pathname, filename } = config.fallback;
    io.push({
      pathname,
      outputPath: join(dir, filename)
    });
  }

  let reusable = createReusable(historyOptions);

  return Promise.all<Result>(
    io.map(({ pathname, outputPath }) => {
      return new Promise(resolve => {
        try {
          // create a new router for each so we don't run into any issues
          // with overlapping requests

          let router = createRouter<LocationOptions>(reusable, routes, {
            ...routerOptions,
            // need to emit redirects or will get stuck waiting forever
            invisibleRedirects: false,
            history: {
              location: { url: pathname }
            }
          });

          router.once(
            (emitted: Emitted) => {
              try {
                let html = render(emitted);
                outputFile(outputPath, html).then(() => {
                  resolve({ pathname, success: true });
                });
              } catch (e) {
                resolve({ pathname, success: false, error: e });
              }
            },
            { initial: true }
          );
        } catch (e) {
          resolve({ pathname, success: false, error: e });
        }
      });
    })
  );
}
