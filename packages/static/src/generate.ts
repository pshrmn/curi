import { outputFile } from "fs-extra";
import { join } from "path";
import { curi } from "@curi/router";
import InMemory from "@hickory/in-memory";

import pathnames from "./pathnames";

// types
import { RouteDescriptor, Params, RouterOptions, Emitted } from "@curi/router";

export interface PageDescriptor {
  name: string;
  params?: Params;
}

export interface GenerateConfiguration {
  routes: Array<RouteDescriptor>;
  pages: Array<PageDescriptor>;
  render: (emitted: Emitted) => string;
  insert: (markup: string, emitted: Emitted) => string;
  outputDir: string;
  outputRedirects?: boolean;
  routerOptions?: RouterOptions;
}

export interface Result {
  pathname: string;
  success: boolean;
  error?: Error;
}

export default async function generate(
  config: GenerateConfiguration
): Promise<Array<Result>> {
  const {
    routes,
    pages,
    outputDir,
    render,
    insert,
    routerOptions,
    outputRedirects = false
  } = config;

  return Promise.all<Result>(
    pathnames({ routes, pages, routerOptions }).map(pathname => {
      return new Promise((resolve, reject) => {
        try {
          // create a new router for each so we don't run into any issues
          // with overlapping requests
          const history = InMemory({ locations: [pathname] });

          const router = curi(history, routes, {
            ...routerOptions,
            emitRedirects: true, // need to emit redirects or will get stuck waiting forever
            automaticRedirects: false // and the responses should be for the redirect
          });

          router.once(
            (emitted: Emitted) => {
              const { response } = emitted;
              if (response.redirectTo && !outputRedirects) {
                resolve({
                  pathname,
                  success: false,
                  error: new Error("redirect")
                });
                return;
              }
              const markup = render(emitted);
              const html = insert(markup, emitted);
              const outputFilename = join(outputDir, pathname, "index.html");
              outputFile(outputFilename, html).then(() => {
                resolve({ pathname, success: true });
              });
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