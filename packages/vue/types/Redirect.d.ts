import Vue, { ComponentOptions } from 'vue';
import { HickoryLocation } from '@hickory/root';
export interface RedirectComponent extends Vue {
    to: string;
    params?: object;
    details?: object;
    location: HickoryLocation;
}
declare const Redirect: ComponentOptions<RedirectComponent>;
export default Redirect;
