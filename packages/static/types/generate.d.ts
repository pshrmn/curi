import { RouteDescriptor, Params } from "@curi/router";
export interface PageDescriptor {
    name: string;
    params?: Params;
}
export interface Options {
    outputDir: string;
    port?: string;
    outputRedirects?: boolean;
}
export default function generate(routes: Array<RouteDescriptor>, pages: Array<PageDescriptor>, options: Options): Promise<void[]>;
