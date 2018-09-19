import { RouteDescriptor, Params } from "@curi/router";
export interface PageDescriptor {
    name: string;
    params?: Params;
}
export interface Options {
    outputDir: string;
    port?: string;
}
export default function generateStaticFiles(routes: Array<RouteDescriptor>, pages: Array<PageDescriptor>, options: Options): Promise<void[]>;
