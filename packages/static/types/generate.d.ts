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
export default function generate(config: GenerateConfiguration): Promise<any>;
