import Vue, { ComponentOptions } from 'vue';
import { HickoryLocation } from '@hickory/root';
export interface LinkComponent extends Vue {
    to: string;
    params?: object;
    details?: object;
    location: HickoryLocation;
    href: string;
    click(e: MouseEvent): void;
}
declare const Link: ComponentOptions<LinkComponent>;
export default Link;
