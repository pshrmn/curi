import { CuriConfig } from '@curi/core';
import { PluginObject } from 'vue';
export interface CuriPluginOptions {
    config: CuriConfig;
}
declare const CuriPlugin: PluginObject<CuriPluginOptions>;
export default CuriPlugin;
