import Vue, { ComponentOptions } from "vue";
import { HickoryLocation } from "@hickory/root";
export interface LinkComponent extends Vue {
    to: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    location: HickoryLocation;
    href: string;
    click(e: MouseEvent): void;
    loading: boolean;
}
declare const Link: ComponentOptions<LinkComponent>;
export default Link;
