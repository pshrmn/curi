import request from "request-promise-native";
import { ensureDir, outputFile } from "fs-extra";
import { join } from "path";
import { pathname } from "@curi/router";

// types
import { RouteDescriptor, Route, Params, Interaction } from "@curi/router";

export interface PageDescriptor {
  name: string;
  params?: Params;
}

export interface Options {
  outputDir: string;
  port?: string;
}

function localURI(path: string, port: string = "8000") {
  return `http://localhost:${port}${path}`;
}

async function makeDirs(base: string, dirPath: string) {
  const full = join(base, dirPath);
  await ensureDir(full);
  return full;
}

function registerRoutes(
  routes: Array<RouteDescriptor>,
  generator: Interaction,
  parent?: any
) {
  routes.forEach(route => {
    const parentData = generator.register(route as Route);
    if (route.children) {
      registerRoutes(route.children, generator, parentData);
    }
  });
}

export default function generateStaticFiles(
  routes: Array<RouteDescriptor>,
  pages: Array<PageDescriptor>,
  options: Options
) {
  const { port, outputDir } = options;

  const pathnameGenerator = pathname();
  registerRoutes(routes, pathnameGenerator);

  const pageURLs = pages.map(page => {
    const pathname = pathnameGenerator.get(page.name, page.params);
    if (pathname == null) {
      console.warn(
        `Failed to create page URL for "${
          page.name
        }" with params ${JSON.stringify(page.params)}`
      );
    }
    return pathname;
  });

  return Promise.all(
    pageURLs.map(async url => {
      try {
        const response = await request({
          uri: localURI(url, port),
          resolveWithFullResponse: true
        });
        if (response.statusCode === 200) {
          const outputFilename = join(outputDir, url, "index.html");
          await outputFile(outputFilename, response.body);
          console.log(`Successfully generated and saved HTML for ${url}`);
        } else {
          console.log(
            `Unexpected status (${response.statusCode}) for "${url}"`
          );
        }
      } catch (e) {
        console.error(`Failed to generate HTML for "${url}"`);
        console.error(e);
      }
    })
  );
}
