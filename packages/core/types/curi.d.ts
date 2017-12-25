import { History } from '@hickory/root';
import { RouteDescriptor } from './types/route';
import { CuriConfig, ConfigOptions } from './types/curi';
declare function createConfig(history: History, routeArray: Array<RouteDescriptor>, options?: ConfigOptions): CuriConfig;
export default createConfig;
