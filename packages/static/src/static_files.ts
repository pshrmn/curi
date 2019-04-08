import * as fs from "fs-extra";
import { join } from "path";
import { create_router } from "@curi/router";
import { reusable_server_history } from "@hickory/in-memory";

import pathnames from "./pathnames";

import { LocationOptions } from "@hickory/in-memory";
import { Emitted } from "@curi/types";
import { StaticConfiguration, Result } from "./types";

export default async function static_files(
  config: StaticConfiguration
): Promise<Array<Result>> {
  const {
    pages,
    router: { routes, options: router_options = () => ({}) },
    output: { render, insert, dir, redirects = false },
    history: history_options
  } = config;

  // generate input pathname/output filename pairs
  // for the provided pages
  const input_output = pathnames({
    routes,
    pages,
    options: router_options()
  }).map(pathname => {
    return {
      pathname,
      output_path: join(dir, pathname, "index.html")
    };
  });

  // if there is a catch all page to be generated,
  // add it to the input/output array
  if (config.fallback) {
    const { pathname, filename } = config.fallback;
    input_output.push({
      pathname,
      output_path: join(dir, filename)
    });
  }

  const history = reusable_server_history(history_options);

  return Promise.all<Result>(
    input_output.map(({ pathname, output_path }) => {
      return new Promise(resolve => {
        try {
          // create a new router for each so we don't run into any issues
          // with overlapping requests

          const router = create_router<LocationOptions>(history, routes, {
            ...router_options(),
            // need to emit redirects or will get stuck waiting forever
            emit_redirects: true,
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
                fs.outputFile(output_path, html).then(() => {
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
