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
export default function serve(config: ServeConfiguration): void;
