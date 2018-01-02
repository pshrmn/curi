import { PluginObject } from 'vue';
import { CuriRouter } from '@curi/core';
import { ReactiveCuriProps } from './interface';
export interface CuriPluginOptions {
    curi: ReactiveCuriProps;
    router: CuriRouter;
}
declare const CuriPlugin: PluginObject<CuriPluginOptions>;
export default CuriPlugin;
