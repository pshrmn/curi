import Vue, { ComponentOptions } from "vue";
import { SessionLocation } from "@hickory/root";
export interface LinkComponent<Q> extends Vue {
    to: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    location: SessionLocation<Q>;
    href: string;
    click(e: MouseEvent): void;
    navigating: boolean;
}
declare const Link: ComponentOptions<LinkComponent<any>>;
export default Link;
