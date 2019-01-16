import * as fs from "fs-extra";
import { join } from "path";
import { curi } from "@curi/router";
import InMemory from "@hickory/in-memory";

import pathnames from "./pathnames";

import { Emitted, RouterOptions } from "@curi/router";
import { StaticConfiguration, Result } from "./types";

function defaultGetRouterOptions(): RouterOptions {
  return {};
}

export default async function staticFiles(
  config: StaticConfiguration
): Promise<Array<Result>> {
  const {
    pages,
    router: { routes, getRouterOptions = defaultGetRouterOptions },
    output: { render, insert, dir, redirects = false }
  } = config;

  // generate input pathname/output filename pairs
  // for the provided pages
  const inputOutput = pathnames({
    routes,
    pages,
    routerOptions: getRouterOptions()
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
    inputOutput.push({
      pathname,
      outputPath: join(dir, filename)
    });
  }

  return Promise.all<Result>(
    inputOutput.map(({ pathname, outputPath }) => {
      return new Promise(resolve => {
        try {
          // create a new router for each so we don't run into any issues
          // with overlapping requests
          const history = InMemory({ locations: [pathname] });

          const router = curi(history, routes, {
            ...getRouterOptions(),
            // need to emit redirects or will get stuck waiting forever
            emitRedirects: true,
            // and the responses should be for the redirect
            automaticRedirects: false
          });

          router.once(
            (emitted: Emitted) => {
              try {
                const { response } = emitted;
                if (response.redirectTo && !redirects) {
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
