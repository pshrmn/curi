import Vue from "vue";
import { ComponentOptions } from "vue";
import { SessionLocation } from "@hickory/root";
export interface LinkComponent extends Vue {
    name: string;
    params?: object;
    hash?: string;
    query?: any;
    state?: any;
    location: SessionLocation;
    href: string;
    click(e: MouseEvent): void;
    forward?: object;
}
declare const Link: ComponentOptions<LinkComponent>;
export default Link;
