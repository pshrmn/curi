import { PluginObject } from 'vue';
import { CuriPluginObject } from './interface';
export interface CuriPluginOptions {
    curi: CuriPluginObject;
}
declare const CuriPlugin: PluginObject<CuriPluginOptions>;
export default CuriPlugin;
