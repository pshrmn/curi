import Vue, { ComponentOptions } from 'vue';
import { HickoryLocation } from '@hickory/root';
export interface ActiveLink {
    merge(props: object): object;
    partial?: boolean;
}
export interface LinkComponent extends Vue {
    to: string;
    params?: object;
    details?: object;
    location: HickoryLocation;
    href: string;
    active: ActiveLink;
    click(e: MouseEvent): void;
}
declare const Link: ComponentOptions<LinkComponent>;
export default Link;
