import * as fs from "fs-extra";
import { join } from "path";
import { createRouter } from "@curi/router";
import { createReusable } from "@hickory/in-memory";

import pathnames from "./pathnames";

import { LocationOptions } from "@hickory/in-memory";
import { Emitted } from "@curi/types";
import { StaticConfiguration, Result } from "./types";

export default async function staticFiles(
  config: StaticConfiguration
): Promise<Array<Result>> {
  const {
    pages,
    router: { routes, options: routerOptions = () => ({}) },
    output: { render, insert, dir, redirects = false },
    history: historyOptions
  } = config;

  // generate input pathname/output filename pairs
  // for the provided pages
  const io = pathnames({
    routes,
    pages,
    options: routerOptions()
  }).map(pathname => {
    return {
      pathname,
      outputPath: join(dir, pathname, "index.html")
    };
  });

  // if there is a catch all page to be generated,
  // add it to the input/output array
  if (config.fallback) {
    const { pathname, filename } = config.fallback;
    io.push({
      pathname,
      outputPath: join(dir, filename)
    });
  }

  const reusable = createReusable(historyOptions);

  return Promise.all<Result>(
    io.map(({ pathname, outputPath }) => {
      return new Promise(resolve => {
        try {
          // create a new router for each so we don't run into any issues
          // with overlapping requests

          const router = createRouter<LocationOptions>(reusable, routes, {
            ...routerOptions(),
            // need to emit redirects or will get stuck waiting forever
            emitRedirects: true,
            history: {
              location: pathname
            }
          });

          router.once(
            (emitted: Emitted) => {
              try {
                const { response } = emitted;
                if (response.redirect && !redirects) {
                  resolve({
                    pathname,
                    success: false,
                    error: new Error("redirect")
                  });
                  return;
                }
                const markup = render(emitted);
                const html = insert(markup);
                fs.outputFile(outputPath, html).then(() => {
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
