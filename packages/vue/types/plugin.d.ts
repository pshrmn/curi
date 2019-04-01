import { PluginObject } from "vue";
import { CuriRouter } from "@curi/types";
export interface CuriPluginOptions {
    router: CuriRouter;
}
declare const CuriPlugin: PluginObject<CuriPluginOptions>;
export default CuriPlugin;
