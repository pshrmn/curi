import { PluginObject } from 'vue';
import { ReactiveCuriProps } from './interface';
export interface CuriPluginOptions {
    curi: ReactiveCuriProps;
}
declare const CuriPlugin: PluginObject<CuriPluginOptions>;
export default CuriPlugin;
